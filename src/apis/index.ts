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
	(err) => {
		toast(err.message);
		return Promise.reject(err);
	}
);

// schemas
export const userSchema = new schema.Entity<User>("users");

export const qSchema = new schema.Entity<Question>("questions", {
	user: userSchema,
});
