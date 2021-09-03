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
		isMutating: false, // when doing any db mutations like deleting or adding
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
			.addCase(handleLoadQuestions.pending, (state) => {
				state.status = "pending";
			})
			.addCase(handleLoadQuestions.rejected, (state) => {
				state.status = "failed";
			})
			.addCase(handleDeleteQuestion.pending, (state, { meta }) => {
				qAdapter.removeOne(state, meta.arg.id);
			})
			.addCase(handleDeleteQuestion.rejected, (state, { meta }) => {
				// put the question back in redux state incase it could not be deleted from the backend
				qAdapter.addOne(state, meta.arg);
			});
	},
});

export default slice.reducer;
