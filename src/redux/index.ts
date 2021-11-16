import {
	configureStore,
	AsyncThunk,
	AsyncThunkOptions,
	AsyncThunkPayloadCreator,
} from "@reduxjs/toolkit";
import rootReducer from "./slices";

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

/*
	YOU CAN TOTALLY IGNORE THE CODE BELOW

	The code below is just enhancing typescript types in createAsyncThunk
	by setting state to be RootState in that function instead of doing it manually each time
	credit: https://stackoverflow.com/a/69038456/10272966
*/

declare module "@reduxjs/toolkit" {
	type AsyncThunkConfig = {
		state?: unknown;
		dispatch?: AppDispatch;
		extra?: unknown;
		rejectValue?: unknown;
		serializedErrorType?: unknown;
	};

	function createAsyncThunk<
		Returned,
		ThunkArg = void,
		ThunkApiConfig extends AsyncThunkConfig = { state: RootState } // here is the magic line
	>(
		typePrefix: string,
		payloadCreator: AsyncThunkPayloadCreator<
			Returned,
			ThunkArg,
			ThunkApiConfig
		>,
		options?: AsyncThunkOptions<ThunkArg, ThunkApiConfig>
	): AsyncThunk<Returned, ThunkArg, ThunkApiConfig>;
}
