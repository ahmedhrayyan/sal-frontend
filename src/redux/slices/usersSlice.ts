import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	isFulfilled,
	createSelector
} from "@reduxjs/toolkit";
import { RootState } from "..";
import usersApi from "../../apis/users";
import { handleShowProfile, handleUpdateProfile } from "./profileSlice";
import {
	handleLoadQuestions,
	handleLoadUserQuestions,
	handleShowQuestion,
} from "./questionsSlice";

export const handleShowUser = createAsyncThunk("users/show", usersApi.show, {
	condition: (username, { getState }) => !getState().users.entities[username],
});

const usersAdapter = createEntityAdapter<User>({
	selectId: (user) => user.username, // the unique field in users is username
});

const slice = createSlice({
	name: "questions",
	initialState: usersAdapter.getInitialState({
		status: "idle" as LoadingStatus,
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(handleLoadUserQuestions.fulfilled, (state, { meta }) => {
				// add fetched questions pages to each user, useful for pagination & conditional fetching
				const { username, page } = meta.arg;
				const user = state.entities[username];
				if (user) {
					if (!user.fetchedQPages) user.fetchedQPages = [page];
					else user.fetchedQPages.push(page);
				}
			})
			.addMatcher(
				isFulfilled(
					handleLoadQuestions,
					handleShowQuestion,
					handleShowProfile,
					handleUpdateProfile
				),
				(state, { payload }) => {
					usersAdapter.upsertMany(state, payload.entities.users);
				}
			);
	},
});

export default slice.reducer;

export const selectUser = createSelector(
	(state: RootState) => state.users,
	(_: any, uId: number) => uId,
	(users, uId) => users.entities[uId] as User
)