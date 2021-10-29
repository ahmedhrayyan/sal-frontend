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
import aApi from "../../apis/answers";
import { changeVote } from "../../utils/redux";

export const handleLoadAnswers = createAsyncThunk("a/all",
  aApi.fetchQuestionAnswers, {
  condition: ({ qId, page }, { getState }) =>
    !getState().questions.entities[qId]?.fetchedAPages?.includes(page),
});

export const handleShowAnswer = createAsyncThunk("a/show", aApi.show, {
  condition: (id, { getState }) => !getState().answers.ids.includes(id),
});

export const handleDeleteAnswer = createAsyncThunk(
  "a/delete",
  (a: Answer) => aApi.remove(a.id)
);

type VoteArg = { answer: Answer; vote: Vote };
export const handleVoteAnswer = createAsyncThunk(
  "a/vote",
  ({ answer, vote }: VoteArg) => aApi.vote(answer.id, vote)
);

export const handleAddAnswer = createAsyncThunk("a/add", aApi.store);
export const handleUpdateAnswer = createAsyncThunk("a/update", aApi.update);

const aAdapter = createEntityAdapter<Answer>();
const selectors = aAdapter.getSelectors();

const slice = createSlice({
  name: "answers",
  initialState: aAdapter.getInitialState({
    status: "idle" as LoadingStatus,
  }),
  reducers: {
    answerAdded: aAdapter.upsertOne,
    answerRemoved: aAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLoadAnswers.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        aAdapter.upsertMany(state, payload.entities.answers);
      })
      .addCase(handleDeleteAnswer.pending, (state, { meta }) => {
        aAdapter.removeOne(state, meta.arg.id);
      })
      .addCase(handleDeleteAnswer.rejected, (state, { meta }) => {
        aAdapter.addOne(state, meta.arg); // put the question back in redux state incase of delete errors
      })
      .addCase(handleVoteAnswer.pending, (state, { meta }) => {
        const { answer, vote } = meta.arg;
        changeVote(state.entities[answer.id] as any, vote);
      })
      .addCase(handleVoteAnswer.rejected, (state, { meta }) => {
        aAdapter.upsertOne(state, meta.arg.answer); // put the original question back to the redux state incase of vote errors
      })
      .addMatcher(
        isFulfilled(
          handleShowAnswer,
          handleAddAnswer,
          handleUpdateAnswer
        ),
        (state, { payload }) => {
          state.status = "succeeded";
          aAdapter.upsertMany(state, payload.entities.answers);
        }
      )
      .addMatcher(
        isPending(handleLoadAnswers, handleShowAnswer),
        (state) => {
          state.status = "pending";
        }
      )
      .addMatcher(
        isPending(handleAddAnswer, handleUpdateAnswer),
        (state) => {
          state.status = "mutating";
        }
      )
      .addMatcher(
        isRejected(
          handleLoadAnswers,
          handleShowAnswer,
          handleAddAnswer,
          handleUpdateAnswer
        ),
        (state) => {
          state.status = "failed";
        }
      );
  },
});

export default slice.reducer;

export const selectNextAPage = createSelector(
  (state: RootState) => state.questions,
  (_: any, qId: number) => qId,
  (questions, qId) => {
    const pages = questions.entities[qId]?.fetchedAPages;
    if (pages)
      return (pages.length === 0 ? 1 : pages[pages.length - 1] + 1);
  }
)

export const selectAnswers = createSelector(
  (state: RootState) => selectors.selectAll(state.answers),
  (_: any, qId: number) => qId,
  (answers, qId) => {
    return answers.filter(answer => answer.question_id === qId);
  }
)

export const selectQAnswers = createSelector(
  (state: RootState) => state.answers,
  answers => answers

)

export const selectAStatus = createSelector(
  (state: RootState) => state.answers,
  (answers) => answers.status as LoadingStatus
)
