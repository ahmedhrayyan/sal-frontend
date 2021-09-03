import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import qApi from "../../apis/questions";

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
			.addCase(handleShowQuestion.fulfilled, (state, { payload }) => {
				state.status = "succeeded";
				qAdapter.upsertMany(state, payload.entities.questions);
			})
			.addCase(handleDeleteQuestion.pending, (state, { meta }) => {
				qAdapter.removeOne(state, meta.arg.id);
			})
			.addCase(handleDeleteQuestion.rejected, (state, { meta }) => {
				// put the question back in redux state incase it could not be deleted from the backend
				qAdapter.addOne(state, meta.arg);
			})
			.addMatcher(
				(action) => /^q\/.*\/pending$/.test(action.type), // matching questions pending actions
				(state, { type }) => {
					state.status = /update|add/.test(type) ? "mutating" : "pending"; // assign mutating to status in mutating actions
				}
			)
			.addMatcher(
				(action) => /^q\/.*\/rejected$/.test(action.type), // matching questions rejected actions
				(state) => {
					state.status = "failed";
				}
			);
	},
});

export default slice.reducer;
