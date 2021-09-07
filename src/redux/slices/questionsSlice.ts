import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	isFulfilled,
	isPending,
	isRejected,
} from "@reduxjs/toolkit";
import qApi from "../../apis/questions";
import { changeVote } from "../../utils/redux";

export const handleLoadQuestions = createAsyncThunk("q/all", qApi.fetchPage, {
	condition: (page, { getState }) =>
		!getState().questions.fetchedPages.includes(page),
});

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
			.addMatcher(
				isFulfilled(
					handleShowQuestion,
					handleAddQuestion,
					handleUpdateQuestion
				),
				(state, { payload }) => {
					state.status = "succeeded";
					qAdapter.upsertMany(state, payload.entities.questions);
				}
			)
			.addMatcher(
				isPending(handleLoadQuestions, handleShowQuestion),
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
