import { createStandaloneToast } from "@chakra-ui/react";
import axios from "axios";
import theme from "../theme";

const toast = createStandaloneToast({ theme });

export const API_ROOT = process.env.REACT_APP_API_URL as string;
if (!API_ROOT) {
	console.error("REACT_APP_API_URL env variable is missing!");
}

export const client = axios.create({
	baseURL: API_ROOT,
});

client.interceptors.request.use((config) => {
	// add Authorization to each request if token exists
	const token = localStorage.getItem("token");
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

client.interceptors.response.use(
	(res) => res,
	(error) => {
		const status = error.request.status;
		let message: string =
			status === 0
				? "Check your internet connection."
				: status === 500
				? "Internal Server Error, Try again later."
				: error.response.data.message;

		// handle unauthorized requests
		if (status === 401) {
			// give the user a more clear message
			message = "Please login to continue.";
			// the 401 error indicate that the token stored in local storage (if any) is not valid
			localStorage.removeItem("token");
		}

		// show feedback to user
		toast({
			title: "Error",
			description: message,
			status: "error",
			duration: 5000,
			isClosable: true,
		});

		// reject with request status, useful in detecting 401 errors in authSlice
		return Promise.reject(status);
	}
);
