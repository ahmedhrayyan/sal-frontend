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
			!getState().notifications.fetchedPages.includes(page),
	}
);

export const handleMarkNotificationRead = createAsyncThunk(
	"notifications/mark-read",
	(notification: APINotification) => notificationsApi.setRead(notification.id),
	{
		condition: ({ id }, { getState }) => {
			const target = getState().notifications.entities[id];
			if (!target) return false;
			return !target.is_read;
		},
	}
);

const notificationAdapter = createEntityAdapter<APINotification>();

const slice = createSlice({
	name: "questions",
	initialState: notificationAdapter.getInitialState({
		total: 0,
		unread_count: null as null | number,
		fetchedPages: [] as number[],
		status: "idle" as LoadingStatus,
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(handleLoadNotifications.fulfilled, (state, { payload }) => {
				state.status = "succeeded";
				state.total = payload.result.meta.total;
				state.unread_count = payload.result.unread_count;
				state.fetchedPages.push(payload.result.meta.current_page);
				notificationAdapter.upsertMany(
					state,
					payload.entities.notifications || []
				);
			})
			.addCase(handleMarkNotificationRead.pending, (state, { meta }) => {
				const target = state.entities[meta.arg.id] as APINotification;
				target.is_read = true;
				if (state.unread_count) state.unread_count -= 1;
			})
			.addCase(handleMarkNotificationRead.rejected, (state, { meta }) => {
				notificationAdapter.upsertOne(state, meta.arg); // put the original question back to the redux state incase of vote errors
				if (state.unread_count) state.unread_count += 1;
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
