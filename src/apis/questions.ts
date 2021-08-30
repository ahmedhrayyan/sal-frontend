import { APIData, client } from ".";

function fetchPage(page: number) {
	return client.get<APIData<Question[]>>(`/questions?page=${page}`);
}

function remove(id: number) {
	return client.delete(`/questions/${id}`)
}

const questionsAPI = {
	fetchPage,
	remove
}

export default questionsAPI;
