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

client.interceptors.response.use(
	(res) => res,
	(err) => {
		toast(err.message);
		return Promise.reject(err);
	}
);

export interface APIData<T = any> {
	data: T;
	meta?: {
		current_page: number;
		per_page: number;
		total: number;
	};
	success: boolean;
}

export type APIDelete = { success: true; deleted_id: number };
