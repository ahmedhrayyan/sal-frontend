import {
	createAsyncThunk,
	createSlice,
	isFulfilled,
} from "@reduxjs/toolkit";
import profileApi from "../../apis/profile";
import {
	isPendingAction,
	isRejectedAction,
} from "../../utils/redux";

export const handleShowProfile = createAsyncThunk(
	"profile/show",
	profileApi.showProfile
);
export const handleUpdateProfile = createAsyncThunk(
	"profile/update",
	profileApi.showProfile
);
export const handleLogin = createAsyncThunk("profile/login", profileApi.login);
export const handleRegister = createAsyncThunk(
	"profile/register",
	profileApi.register
);

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
			.addMatcher(
				isFulfilled(handleLogin, handleRegister),
				(state, { payload }) => {
					state.status = "succeeded";
					state.token = payload.data.token;
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
				if (error.message === "401") state.token = null; // handle unauthorized requests error in all actions
			});
	},
});

export default slice.reducer;
