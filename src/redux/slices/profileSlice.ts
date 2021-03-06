import {
	createAction,
	createAsyncThunk,
	createSlice,
	isFulfilled,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import profileApi from "../../apis/profile";
import { isPendingAction, isRejectedAction } from "../../utils/redux";

export const handleShowProfile = createAsyncThunk(
	"profile/show",
	profileApi.show
);
export const handleUpdateProfile = createAsyncThunk(
	"profile/update",
	profileApi.update
);
export const handleLogin = createAsyncThunk("profile/login", profileApi.login);
export const handleRegister = createAsyncThunk(
	"profile/register",
	profileApi.register
);

export const handleLogout = createAction("profile/logout");

const slice = createSlice({
	name: "profile",
	initialState: {
		status: "idle" as LoadingStatus,
		token: localStorage.getItem("token"),
		user: null as null | string, // the current user who have signed in
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(handleLogout, (state) => {
				state.token = null;
				state.user = null;
			})
			.addMatcher(
				isFulfilled(handleLogin, handleRegister),
				(state, { payload }) => {
					state.status = "succeeded";
					state.token = payload.token;
				}
			)
			.addMatcher(
				isFulfilled(handleShowProfile, handleUpdateProfile),
				(state, { payload }) => {
					state.status = "succeeded";
					state.user = payload.result.data;
				}
			)
			.addMatcher(isPendingAction("profile/"), (state, { type }) => {
				state.status = type.includes("update") ? "mutating" : "pending";
			})
			.addMatcher(isRejectedAction(), (state, { type, error }) => {
				if (type.startsWith("profile/")) state.status = "failed"; // handle profile actions errors
				// handle unauthorized requests error in all actions
				if (error.message === "401") {
					state.token = null;
					state.user = null;
				}
			});
	},
});

export const selectProfile = (state: RootState) => {
	if (!state.profile.user) return null;
	return state.users.entities[state.profile.user] as Profile;
}

export default slice.reducer;
