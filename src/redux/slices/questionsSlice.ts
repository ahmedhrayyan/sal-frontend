import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	isFulfilled,
	isPending,
	isRejected,
	createSelector,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import qApi from "../../apis/questions";
import { changeVote } from "../../utils/redux";
import {
	handleLoadAnswers,
	handleAddAnswer,
	handleDeleteAnswer,
} from "./answerSlice";

export const handleLoadQuestions = createAsyncThunk("q/all", qApi.fetchPage, {
	condition: ({ page, search }, { getState }) =>
		!(
			getState().questions.fetchedPages.includes(page) &&
			getState().questions.search === search
		),
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

const qAdapter = createEntityAdapter<Question>({
	sortComparer: (a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes),
});

const slice = createSlice({
	name: "q",
	initialState: qAdapter.getInitialState({
		total: 0,
		fetchedPages: [] as number[],
		status: "idle" as LoadingStatus,
		search: "" as string,
	}),
	reducers: {
		questionAdded: qAdapter.upsertOne,
		questionRemoved: qAdapter.removeOne,
		clearSearchPages: (state) => {
			state.fetchedPages = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(handleLoadQuestions.fulfilled, (state, { payload }) => {
				state.status = "succeeded";
				state.total = payload.result.meta.total;
				state.search = payload.result.search_term;
				state.fetchedPages.push(payload.result.meta.current_page);

				// Remove Qs if (searchTerm changed) ONLY
				if (payload.result.meta.current_page === 1) {
					qAdapter.removeAll(state);
				}
				// null saftey
				if (payload.entities.questions)
					qAdapter.upsertMany(state, payload.entities.questions);
			})
			.addCase(handleLoadUserQuestions.fulfilled, (state, action) => {
				state.status = "succeeded";
				if (action.payload.entities.questions)
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
				// put the question back in redux state incase of delete errors
				qAdapter.addOne(state, meta.arg);
			})
			.addCase(handleVoteQuestion.pending, (state, { meta }) => {
				const { question, vote } = meta.arg;
				changeVote(state.entities[question.id] as any, vote);
			})

			.addCase(handleVoteQuestion.rejected, (state, { meta }) => {
				// put the original question back to the redux state incase of vote errors
				qAdapter.upsertOne(state, meta.arg.question);
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
				isFulfilled(handleShowQuestion, handleUpdateQuestion),
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

export const { clearSearchPages } = slice.actions;
export default slice.reducer;

export const selectQuestions = (state: RootState) => {
	return state.questions;
};
export const selectQStatus = (state: RootState) =>
	state.questions.status as LoadingStatus;
export const selectQSearch = (state: RootState) =>
	state.questions.search as string;
export const selectQuestion = (state: RootState, qId: number) => {
	return state.questions.entities[qId] as Question;
};

export const selectNextQPage = createSelector(
	(state: RootState) => state.questions.fetchedPages,
	(pages) => {
		return pages.length === 0 ? 1 : pages[pages.length - 1] + 1;
	}
);
