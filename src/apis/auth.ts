import { client } from ".";

type ResponseData = { success: boolean; token: string };

async function login(data: LoginData) {
	const res = await client.post<ResponseData>("/login", data);
	localStorage.setItem("token", res.data.token);
	return res;
}

async function register(data: RegisterData) {
	const res = await client.post<ResponseData>("/register", data);
	localStorage.setItem("token", res.data.token);
	return res;
}

const authApi = {
	login,
	register,
};

export default authApi;
