import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../apis/auth";

// below I'm givin the same name to both function so that handling one of them in the reducer would handle the other
export const handleLogin = createAsyncThunk("auth", authApi.login);
export const handleRegister = createAsyncThunk("auth", authApi.register);

const slice = createSlice({
	name: "auth",
	initialState: {
		status: "idle" as LoadingStatus,
		token: localStorage.getItem("token"),
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(handleLogin.fulfilled, (state, { payload }) => {
			state.status = "succeeded";
			state.token = payload.data.token;
		});
		builder.addCase(handleLogin.pending, (state) => {
			state.status = "pending";
		});
		builder.addCase(handleLogin.rejected, (state) => {
			state.status = "failed";
		});
		builder.addDefaultCase((state, { error }) => {
			// handle logout or unauthorized requests error
			if (error?.message === "401") state.token = null;
		});
	},
});

export default slice.reducer;
