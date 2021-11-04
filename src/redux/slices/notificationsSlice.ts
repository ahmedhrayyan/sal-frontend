import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	createSelector,
	isPending,
	isRejected,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import notificationsApi from "../../apis/notifications";

export const handleLoadNotifications = createAsyncThunk(
	"notifications/all",
	notificationsApi.fetchPage,
	{
		condition: (page, { getState }) =>
			!getState().questions.fetchedPages.includes(page),
	}
);

const notificationAdapter = createEntityAdapter<APINotification>();

const slice = createSlice({
	name: "questions",
	initialState: notificationAdapter.getInitialState({
		total: 0,
		fetchedPages: [] as number[],
		status: "idle" as LoadingStatus,
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(handleLoadNotifications.fulfilled, (state, { payload }) => {
				state.status = "succeeded";
				state.total = payload.result.meta.total;
				state.fetchedPages.push(payload.result.meta.current_page);
				notificationAdapter.upsertMany(state, payload.entities.notifications || []);
			})
			.addMatcher(isPending(handleLoadNotifications), (state) => {
				state.status = "pending";
			})
			.addMatcher(isRejected(handleLoadNotifications), (state) => {
				state.status = "failed";
			});
	},
});

const { selectAll } = notificationAdapter.getSelectors();
export const selectNotifications = createSelector(
	(state: RootState) => state.notifications,
	(notifications) => selectAll(notifications)
);

export default slice.reducer;
