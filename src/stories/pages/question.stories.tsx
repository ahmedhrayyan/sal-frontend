import { ComponentStory, ComponentMeta } from "@storybook/react";
import QuestionPage from "../../pages/Question";
import getQuestion from "../mocks/question";
import getUser from "../mocks/user";

export default {
  title: "Pages/Question",
  component: QuestionPage,
} as ComponentMeta<typeof QuestionPage>;

export const Question = (args: any) => (
  <QuestionPage
    {...args}
    question={getQuestion()}
    currentUser={getUser({id: 99})} // change currentUser
    authToken=""
  />
);
