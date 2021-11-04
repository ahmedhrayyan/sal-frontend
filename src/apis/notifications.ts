import { normalize } from "normalizr";
import { notificationEntity } from "./schemas";
import { client } from ".";

// defining normalize return type manually as normalize has bad typescript support
// general types used here are defined in ./src/types.d.ts file
type Normalized<T = Result> = {
	entities: { notifications?: Record<number, APINotification> };
	result: T;
};

async function fetchPage(page: number) {
	const { data } = await client.get(`/notifications?page=${page}`);
	return normalize(data, { data: [notificationEntity] }) as Normalized;
}

const notificationsApi = {
	fetchPage,
};

export default notificationsApi;
