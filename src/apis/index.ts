import { createStandaloneToast } from "@chakra-ui/react";
import { schema } from "normalizr";
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

client.interceptors.response.use(
	(res) => res,
	({ response, request }) => {
		let message: string =
			request.status === 0
				? "Check your internet connection."
				: request.status === 500
				? "Internal Server Error, Try again later."
				: response.data.message;
		// handle unauthorized requests
		if (request.status === 401) {
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
		// throw response status as the error message, useful when detecting 401 errors in authSlice
		throw new Error(request.status);
	}
);

/* schemas */

export const userSchema = new schema.Entity<User>("users");
export const qSchema = new schema.Entity<Question>("questions", {
	user: userSchema,
});
