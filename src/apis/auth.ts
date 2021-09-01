import { client } from ".";

type ResponseData = { success: boolean; token: string };

function login(data: LoginData) {
	return client.post<ResponseData>("/login", data);
}

function register(data: RegisterData) {
	return client.post<ResponseData>("/register", data);
}

const authApi = {
	login,
	register,
};

export default authApi;
