import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "..";
import authApi from "../../apis/auth";

const slice = createSlice({
	name: "auth",
	initialState: { status: "idle" as LoadingStatus },
	reducers: {
		authSucceded(state) {
			state.status = "succeeded";
		},
		authFailed(state) {
			state.status = "failed";
		},
		pendingAuth(state) {
			state.status = "pending";
		},
	},
	extraReducers: (builder) => {
		builder.addDefaultCase((state, { error }) => {
			// handle unauthorized requests error
			if (error?.message === "401") state.status = "idle";
		});
	},
});

const { authSucceded, authFailed, pendingAuth } = slice.actions;

export function handleLogin(credentials: LoginData) {
	return async (dispatch: AppDispatch) => {
		dispatch(pendingAuth());
		try {
			const { data } = await authApi.login(credentials);
			localStorage.setItem("token", data.token); // save token in local storage
			return dispatch(authSucceded());
		} catch (e) {
			return dispatch(authFailed());
		}
	};
}

export function handleRegister(registerData: RegisterData) {
	return async (dispatch: AppDispatch) => {
		dispatch(pendingAuth());
		try {
			const { data } = await authApi.register(registerData);
			localStorage.setItem("token", data.token); // save token in local storage
			return dispatch(authSucceded());
		} catch (e) {
			return dispatch(authFailed());
		}
	};
}

export default slice.reducer;
