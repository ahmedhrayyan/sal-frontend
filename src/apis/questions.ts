import { normalize } from "normalizr";
import { qEntity } from "./schemas";
import { client } from ".";

// defining normalize return type manually as normalize has bad typescript support
// general types used here are defined in ./src/types.d.ts file
type Normalized<T = Result> = {
	entities: {
		questions: Record<number, Question>;
		users: Record<string, User>;
	};
	result: T;
};

async function fetchPage(page: number) {
	const { data } = await client.get(`/questions?page=${page}`);
	return normalize(data, { data: [qEntity] }) as Normalized;
}

type FetchUserQuestionsArg = { username: string; page: number };
async function fetchUserQuestions({ username, page }: FetchUserQuestionsArg) {
	const { data } = await client.get(`/users/${username}/questions?page=${page}`);
	return normalize(data, { data: [qEntity] }) as Normalized;
}

async function show(id: number) {
	const { data } = await client.get(`/questions/${id}`);
	// omit (remove) meta from Result as response here has no meta attribute
	return normalize(data, { data: qEntity }) as Normalized<Omit<Result, "meta">>;
}

async function store(content: string) {
	const { data } = await client.post("/questions", { content });
	// omit (remove) meta from Result as response here has no meta attribute
	return normalize(data, { data: qEntity }) as Normalized<Omit<Result, "meta">>;
}

async function update(question: Partial<Question>) {
	const { data } = await client.patch(`/questions/${question.id}`, question);
	// omit (remove) meta from Result as response here has no meta attribute
	return normalize(data, { data: qEntity }) as Normalized<Omit<Result, "meta">>;
}

async function vote(id: number, vote: Vote) {
	const { data } = await client.post(`/questions/${id}/vote`, { vote });
	// omit (remove) meta from Result as response here has no meta attribute
	return normalize(data, { data: qEntity }) as Normalized<Omit<Result, "meta">>;
}

function remove(id: number) {
	return client.delete(`/questions/${id}`);
}

const qApi = {
	fetchPage,
	fetchUserQuestions,
	show,
	remove,
	store,
	update,
	vote,
};

export default qApi;
