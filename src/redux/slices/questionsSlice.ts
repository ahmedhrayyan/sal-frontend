import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import qApi from "../../apis/questions";
import { changeVote } from "../../utils/helpers";

export const handleLoadQuestions = createAsyncThunk("q/all", qApi.fetchPage, {
	condition(page, { getState }) {
		return getState().questions.fetchedPages.indexOf(page) === -1;
	},
});

export const handleShowQuestion = createAsyncThunk("q/show", qApi.show, {
	condition: (id, { getState }) => getState().questions.ids.indexOf(id) === -1,
});

export const handleDeleteQuestion = createAsyncThunk(
	"q/delete",
	(q: Question) => qApi.remove(q.id)
);

export const handleVoteQuestion = createAsyncThunk(
	"q/vote",
	({ question, vote }: { question: Question; vote: Vote }) => {
		return qApi.vote(question.id, vote);
	}
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
				const q = state.entities[question.id];
				if (q) changeVote(q, vote);
			})
			.addCase(handleVoteQuestion.rejected, (state, { meta }) => {
				qAdapter.upsertOne(state, meta.arg.question); // put the original question back to the redux state incase of vote errors
			})
			.addMatcher(
				(action) => /^q\/(show|add|update)\/fulfilled$/.test(action.type), // match fulfilled actions in show, add and update
				(state, { payload }) => {
					state.status = "succeeded";
					qAdapter.upsertMany(state, payload.entities.questions);
				}
			)
			.addMatcher(
				({ type }) => /^q.*pending$/.test(type) && !/delete|vote/.test(type), // match q pending actions except delete and vote
				(state, { type }) => {
					state.status = /update|add/.test(type) ? "mutating" : "pending"; // assign mutating to status in mutating actions
				}
			)
			.addMatcher(
				({ type }) => /^q.*rejected$/.test(type) && !/delete|vote/.test(type), // match q rejected actions except delete and vote
				(state) => {
					state.status = "failed";
				}
			);
	},
});

export default slice.reducer;
