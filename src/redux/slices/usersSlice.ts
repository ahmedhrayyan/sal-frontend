import {
	createEntityAdapter,
	createSlice,
	isFulfilled,
} from "@reduxjs/toolkit";
import { handleShowProfile, handleUpdateProfile } from "./profileSlice";
import { handleLoadQuestions, handleShowQuestion } from "./questionsSlice";

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
		builder.addMatcher(
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
