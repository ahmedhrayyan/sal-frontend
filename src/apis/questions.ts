import { normalize } from "normalizr";
import { client, qSchema } from ".";

// defining normalize return type manually as normalize has bad typescript support
// all types used here are defined in ./src/types.d.ts file
type Normalized<T = Result> = {
	entities: { questions: Entity<Question>; users: Entity<User> };
	result: T;
};

async function fetchPage(page: number) {
	const { data } = await client.get(`/questions?page=${page}`);
	return normalize(data, { data: [qSchema] }) as Normalized;
}

async function show(id: number) {
	const { data } = await client.get(`/questions/${id}`);
	// omit (remove) meta from Result as response here has no meta attribute
	return normalize(data, { data: qSchema }) as Normalized<Omit<Result, "meta">>;
}

async function store(content: string) {
	const { data } = await client.post("/questions", { content });
	// omit (remove) meta from Result as response here has no meta attribute
	return normalize(data, { data: qSchema }) as Normalized<Omit<Result, "meta">>;
}

async function update(question: Partial<Question>) {
	const { data } = await client.patch(`/questions/${question.id}`, question);
	// omit (remove) meta from Result as response here has no meta attribute
	return normalize(data, { data: qSchema }) as Normalized<Omit<Result, "meta">>;
}

async function vote(id: number, vote: Vote) {
	const { data } = await client.post(`/questions/${id}/vote`, { vote });
	// omit (remove) meta from Result as response here has no meta attribute
	return normalize(data, { data: qSchema }) as Normalized<Omit<Result, "meta">>;
}

function remove(id: number) {
	return client.delete(`/questions/${id}`);
}

const qApi = {
	fetchPage,
	show,
	remove,
	store,
	update,
	vote
};

export default qApi;
