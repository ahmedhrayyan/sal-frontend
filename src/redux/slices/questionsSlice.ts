import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import qApi from "../../apis/questions";

export const handleLoadQuestions = createAsyncThunk(
	"questions/load",
	qApi.fetchPage,
	{
		condition(page, { getState }) {
			return getState().questions.fetchedPages.indexOf(page) === -1;
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
	return (dispatch: any) => {
		dispatch(questionRemoved(question.id));
		return qApi.remove(question.id).catch(() => {
			// incase of any error in deleting, add the question back the redux store
			dispatch(questionAdded(question));
		});
	};
}

export default slice.reducer;
