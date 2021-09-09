import { Box, Center } from "@chakra-ui/react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import QuestionForm from "../../components/QuestionForm";
import getUser from "../mocks/user";

export default {
  title: "Components/QuestionForm",
  component: QuestionForm,
} as ComponentMeta<typeof QuestionForm>;

const Template: ComponentStory<typeof QuestionForm> = (args) => (
  <Center>
    <Box maxW="xl" minW="320px" w={["full"]}>
      <QuestionForm {...args} />
    </Box>
  </Center>
);

export const Default = Template.bind({});
Default.args = {
  user: getUser(),
};
