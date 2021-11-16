import { normalize } from "normalizr";
import { userEntity } from "./schemas";
import { client } from ".";

// defining normalize return type manually as normalize has bad typescript support
// general types used here are defined in ./src/types.d.ts file
type Normalized = {
	entities: { users: Record<string, User> };
	result: Omit<Result<string>, "meta">;
};

type AuthRes = { success: boolean; token: string };

async function login(data: LoginData) {
	const res = await client.post<AuthRes>("/login", data);
	localStorage.setItem("token", res.data.token);
	return res.data;
}

async function register(data: RegisterData) {
	const res = await client.post<AuthRes>("/register", data);
	localStorage.setItem("token", res.data.token);
	return res.data;
}

async function show() {
	const { data } = await client.get("/profile");
	return normalize(data, { data: userEntity }) as Normalized;
}

async function update(profile: Partial<Profile>) {
	const { data } = await client.patch("/profile", profile);
	return normalize(data, { data: userEntity }) as Normalized;
}

const profileApi = {
	login,
	register,
	show,
	update
};

export default profileApi;
