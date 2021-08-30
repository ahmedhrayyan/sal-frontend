import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import { normalize } from "normalizr";
import { AppDispatch } from "..";
import questionsAPI from "../../apis/questions";
import { questionEntity } from "../schemas";

export const handleLoadQuestions = createAsyncThunk(
	"questions/load",
	async (page: number = 1) => {
		const res = await await questionsAPI.fetchPage(page);
		const normalized = normalize(res.data, { data: [questionEntity] });
		return normalized;
	},
	{
		condition: (page = 1, { getState }: any) => {
			if (getState().questions.fetchedPages.indexOf(page) > -1) return false;
		},
	}
);

const questionsAdapter = createEntityAdapter<Question>();

const slice = createSlice({
	name: "questions",
	initialState: {
		...questionsAdapter.getInitialState(),
		fetchedPages: [] as number[],
		total: 0,
		status: "idle" as LoadingStatus,
	},
	reducers: {
		questionAdded: questionsAdapter.upsertOne,
		questionRemoved: questionsAdapter.removeOne,
	},
	extraReducers: (builder) => {
		builder
			.addCase(handleLoadQuestions.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.total = action.payload.result.meta.total;
				state.fetchedPages.push(action.payload.result.meta.current_page);
				if (action.payload.entities.questions)
					questionsAdapter.upsertMany(state, action.payload.entities.questions);
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

		return questionsAPI.remove(question.id).catch(() => {
			dispatch(questionAdded(question));
		});
	};
}

export default slice.reducer;
