import getAnswer from "./answer";

const getQuestion = (overrides = {}) => {
  const defaultValues = {
    data: {
      accepted_answer: null,
      answers: [
        {
          ...getAnswer()
        },
      ],
      answers_count: 1,
      content: "Is this the best site in the world?",
      created_at: "Mon, 12 Jul 2021 09:32:03 GMT",
      id: 1,
      prime_answer: null,
      upVotes: 1000,
      downVotes: 3,
      user: {
        avatar: "",
        created_at: "Sat, 10 Jul 2021 13:14:28 GMT",
        email: "mehdat@outlook.com",
        first_name: "Medhat",
        id: 2,
        job: "UI Designer",
        last_name: "Mohamed",
        full_name: "Medhat Mohamed",
        phone: null,
        username: "",
      },
    },
    success: true,
  };
  return Object.assign(defaultValues, overrides);
};
export default getQuestion;