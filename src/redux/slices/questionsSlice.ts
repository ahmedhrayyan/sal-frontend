import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "..";
import qApi from "../../apis/questions";

export const handleLoadQuestions = createAsyncThunk(
	"questions/load",
	(page: number = 1) => qApi.fetchPage(page),
	{
		condition: (page = 1, { getState }) => {
			const { questions } = getState() as RootState;
			// don not make the request if the page has beed fetched
			if (questions.fetchedPages.indexOf(page) > -1) return false;
		},
	}
);

const questionsAdapter = createEntityAdapter<Question>();

const slice = createSlice({
	name: "questions",
	initialState: questionsAdapter.getInitialState({
		total: 0,
		fetchedPages: [] as number[],
		status: "idle" as LoadingStatus,
	}),
	reducers: {
		questionAdded: questionsAdapter.upsertOne,
		questionRemoved: questionsAdapter.removeOne,
	},
	extraReducers: (builder) => {
		builder
			.addCase(handleLoadQuestions.fulfilled, (state, { payload }) => {
				state.status = "succeeded";
				state.total = payload.result.meta.total;
				state.fetchedPages.push(payload.result.meta.current_page);
				questionsAdapter.upsertMany(state, payload.entities.questions);
			})
			.addCase(handleLoadQuestions.pending, (state) => {
				state.status = "pending";
			})
			.addCase(handleLoadQuestions.rejected, (state) => {
				state.status = "failed";
			});
	},
});

const { questionAdded, questionRemoved } = slice.actions;

export function handleDeleteQuestion(question: Question) {
	return (dispatch: AppDispatch) => {
		dispatch(questionRemoved(question.id));
		return qApi.remove(question.id).catch(() => {
			// incase of any error in deleting, add the question back the redux store
			dispatch(questionAdded(question));
		});
	};
}

export default slice.reducer;
