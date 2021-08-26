import getUser from "./user";

const getAnswer = (overrides = {}) => {
  const defaultValues = {
    content: "Great question, I will answer it later :D",
    created_at: "Thu, 19 Aug 2021 20:24:40 GMT",
    id: Math.random() * 50,
    question_id: 1,
    upVotes: 20,
    downVotes: 2,
    user: getUser({ first_name: "Ahmed", last_name: "Hamed", full_name: "Ahmed Hamed", job: "Software Engineer" }),
  };
  return Object.assign(defaultValues, overrides);
};
export default getAnswer;
