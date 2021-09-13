import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Box, Center } from "@chakra-ui/layout";
import QuestionView from "../../components/questionView";
import getQuestion from "../mocks/question";
import getUser from "../mocks/user";
import getAnswer from "../mocks/answer";

export default {
  title: "Components/QuestionView",
  component: QuestionView,
  args: {
    currentUser: getUser({username: "test"}),
    authToken: "",
  },
}as ComponentMeta<typeof QuestionView>;

const Template: ComponentStory<typeof QuestionView> = (args) => (
  <Center>
    <Box maxW="xl" w="full" >
      <QuestionView {...args} />
    </Box>
  </Center>
);

export const Default = Template.bind({});
Default.args = {
  question: getQuestion(),
};

export const MoreThanOneAnswer = Template.bind({});
MoreThanOneAnswer.args = {
  question: getQuestion({
    data: {
      ...getQuestion().data,
      answers_count: 2,
      answers: [{ ...getAnswer() }, { ...getAnswer() }],
    },
  }),
};

export const ManyAnswers = Template.bind({});
ManyAnswers.args = {
  question: getQuestion({
    data: {
      ...getQuestion().data,
      answers_count: 7,
      answers: [
        { ...getAnswer() },
        { ...getAnswer() },
        { ...getAnswer() },
        { ...getAnswer() },
        { ...getAnswer() },
        { ...getAnswer() },
        { ...getAnswer() },
      ],
    },
  }),
};
