import getAnswer from "./answer";

const getQuestion = (overrides = {}) => {
  const defaultValues = {
    accepted_answer: null,
    answers_count: 2,
    content: 'new q 36',
    created_at: 'Tue, 14 Sep 2021 11:30:41 GMT',
    downvotes: 0,
    id: 63,
    upvotes: 0,
    user: 'test258',
    viewer_vote: null
  };
  return Object.assign(defaultValues, overrides);
};
export default getQuestion;