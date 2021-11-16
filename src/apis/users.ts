import { normalize } from "normalizr";
import { userEntity } from "./schemas";
import { client } from ".";

// defining normalize return type manually as normalize has bad typescript support
// general types used here are defined in ./src/types.d.ts file
type Normalized = {
	entities: { users: Record<string, User> };
	result: Omit<Result<string>, "meta">;
};

async function show(username: string) {
	const { data } = await client.get(`/users/${username}`);
	return normalize(data, { data: userEntity }) as Normalized;
}

const usersApi = {
	show
};

export default usersApi;
