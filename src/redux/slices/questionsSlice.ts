import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	isFulfilled,
	isPending,
	isRejected,
	createSelector
} from "@reduxjs/toolkit";
import { RootState } from "..";
import qApi from "../../apis/questions";
import { changeVote } from "../../utils/redux";
import { handleLoadAnswers, handleAddAnswer, handleDeleteAnswer } from "./answerSlice";

export const handleLoadQuestions = createAsyncThunk("q/all", qApi.fetchPage, {
	condition: (page, { getState }) =>
		!getState().questions.fetchedPages.includes(page),
});

export const handleLoadUserQuestions = createAsyncThunk(
	"q/user-all",
	qApi.fetchUserPage,
	{
		condition: ({ username, page }, { getState }) =>
			!getState().users.entities[username]?.fetchedQPages?.includes(page),
	}
);

export const handleShowQuestion = createAsyncThunk("q/show", qApi.show, {
	condition: (id, { getState }) => !getState().questions.ids.includes(id),
});

export const handleDeleteQuestion = createAsyncThunk(
	"q/delete",
	(q: Question) => qApi.remove(q.id)
);

type VoteArg = { question: Question; vote: Vote };
export const handleVoteQuestion = createAsyncThunk(
	"q/vote",
	({ question, vote }: VoteArg) => qApi.vote(question.id, vote)
);

export const handleAddQuestion = createAsyncThunk("q/add", qApi.store);
export const handleUpdateQuestion = createAsyncThunk("q/update", qApi.update);

const qAdapter = createEntityAdapter<Question>();

const slice = createSlice({
	name: "questions",
	initialState: qAdapter.getInitialState({
		total: 0,
		fetchedPages: [] as number[],
		status: "idle" as LoadingStatus,
	}),
	reducers: {
		questionAdded: qAdapter.upsertOne,
		questionRemoved: qAdapter.removeOne,
	},
	extraReducers: (builder) => {
		builder
			.addCase(handleLoadQuestions.fulfilled, (state, { payload }) => {
				state.status = "succeeded";
				state.total = payload.result.meta.total;
				state.fetchedPages.push(payload.result.meta.current_page);
				qAdapter.upsertMany(state, payload.entities.questions);
			})
			.addCase(handleLoadUserQuestions.fulfilled, (state, action) => {
				state.status = "succeeded";
				qAdapter.upsertMany(state, action.payload.entities.questions);
			})
			.addCase(handleAddQuestion.fulfilled, (state, action) => {
				state.status = "succeeded";
				qAdapter.upsertMany(state, action.payload.entities.questions);
				// resort the array to push the new Q to the first
				let tmp = state.ids[state.ids.length - 1];
				state.ids.pop();
				state.ids.unshift(tmp);
			})
			.addCase(handleDeleteQuestion.pending, (state, { meta }) => {
				qAdapter.removeOne(state, meta.arg.id);
			})
			.addCase(handleDeleteQuestion.rejected, (state, { meta }) => {
				qAdapter.addOne(state, meta.arg); // put the question back in redux state incase of delete errors
			})
			.addCase(handleVoteQuestion.pending, (state, { meta }) => {
				const { question, vote } = meta.arg;
				changeVote(state.entities[question.id] as any, vote);
			})
			.addCase(handleVoteQuestion.rejected, (state, { meta }) => {
				qAdapter.upsertOne(state, meta.arg.question); // put the original question back to the redux state incase of vote errors
			})
			.addCase(handleLoadAnswers.fulfilled, (state, { meta }) => {
				const { page, qId } = meta.arg;
				const question = state.entities[qId];
				if (question) {
					if (!question.fetchedAPages) question.fetchedAPages = [page];
					else question.fetchedAPages.push(page);
				}
			})
			.addCase(handleAddAnswer.fulfilled, (state, { meta }) => {
				const { question_id } = meta.arg;
				const question = state.entities[question_id];
				if (question) question.answers_count += 1;
			})
			.addCase(handleDeleteAnswer.fulfilled, (state, { meta }) => {
				const { question_id } = meta.arg;
				const question = state.entities[question_id];
				if (question) question.answers_count -= 1;
			})
			.addMatcher(
				isFulfilled(
					handleShowQuestion,
					handleUpdateQuestion
				),
				(state, { payload }) => {
					state.status = "succeeded";
					qAdapter.upsertMany(state, payload.entities.questions);
				}
			)
			.addMatcher(
				isPending(
					handleLoadQuestions,
					handleLoadUserQuestions,
					handleShowQuestion
				),
				(state) => {
					state.status = "pending";
				}
			)
			.addMatcher(
				isPending(handleAddQuestion, handleUpdateQuestion),
				(state) => {
					state.status = "mutating";
				}
			)
			.addMatcher(
				isRejected(
					handleLoadQuestions,
					handleLoadUserQuestions,
					handleShowQuestion,
					handleAddQuestion,
					handleUpdateQuestion
				),
				(state) => {
					state.status = "failed";
				}
			);
	},
});

export default slice.reducer;

export const selectNextQPage = createSelector(
	(state: RootState) => state.questions.fetchedPages,
	pages => {
		return (pages.length === 0 ? 1 : pages[pages.length - 1] + 1);
	}
)

export const selectQuestions = createSelector(
	(state: RootState) => state.questions,
	questions => questions
)

export const selectQuestion = createSelector(
	(state: RootState) => state.questions,
	(_: any, qId: number) => qId,
	(questions, qId) => questions.entities[qId] as Question
)

export const selectQStatus = createSelector(
	(state: RootState) => state.questions,
	(questions) => questions.status as LoadingStatus
)