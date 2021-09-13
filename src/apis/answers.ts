import { normalize } from "normalizr";
import { client } from ".";
import { aEntity } from "./schemas";

// defining normalize return type manually as normalize has bad typescript support
// general types used here are defined in ./src/types.d.ts file
type Normalized<T = Result> = {
  entities: {
    answers: Record<number, Answer>;
    users: Record<string, User>;
  };
  result: T;
};

type FetchQAArg = { qId: number, page: number };
async function fetchQuestionAnswers({ qId, page }: FetchQAArg) {
  const { data } = await client.get(`/questions/${qId}/answers?page=${page}`);
  return normalize(data, { data: [aEntity] }) as Normalized;
}

async function show(id: number) {
  const { data } = await client.get(`/answers/${id}`);
  return normalize(data, { data: aEntity }) as Normalized<Omit<Result, "meta">>;
}

type StoreArgs = { content: string, question_id: number };
async function store({ content, question_id }: StoreArgs) {
  const { data } = await client.post("/answers", { content, question_id });
  return normalize(data, { data: aEntity }) as Normalized<Omit<Result, "meta">>;
}

async function update(answer: Partial<Answer>) {
  const { data } = await client.patch(`/answers/${answer.id}`, answer);
  return normalize(data, { data: aEntity }) as Normalized<Omit<Result, "meta">>;
}

async function vote(id: number, vote: Vote) {
  const { data } = await client.post(`/answers/${id}/vote`, { vote });
  return normalize(data, { data: aEntity }) as Normalized<Omit<Result, "meta">>;
}

function remove(id: number) {
  return client.delete(`/answers/${id}`);
}

const aApi = {
  fetchQuestionAnswers,
  show,
  remove,
  store,
  update,
  vote
};

export default aApi;
