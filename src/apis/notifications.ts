import { normalize } from "normalizr";
import { notificationEntity } from "./schemas";
import { client } from ".";

// defining normalize return type manually as normalize has bad typescript support
// general types used here are defined in ./src/types.d.ts file
type R = Result & { unread_count: number };
type Normalized<T = R> = {
	entities: { notifications: Record<number, APINotification> };
	result: T;
};

async function fetchPage(page: number) {
	const { data } = await client.get(`/notifications?page=${page}`);
	return normalize(data, { data: [notificationEntity] }) as Normalized;
}

async function setRead(id: number) {
	const { data } = await client.post(`/notifications/${id}/set-read`);
	return normalize(data, { data: [notificationEntity] }) as Normalized<
		Omit<R, "meta">
	>;
}

const notificationsApi = {
	fetchPage,
	setRead,
};

export default notificationsApi;
