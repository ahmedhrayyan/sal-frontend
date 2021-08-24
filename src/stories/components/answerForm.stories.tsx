import { Box, Center } from "@chakra-ui/layout";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import AnswerForm from "../../components/answerForm";
import getUser from "../mocks/user";

export default {
  title: "Components/AnswerForm",
  component: AnswerForm,
} as ComponentMeta<typeof AnswerForm>;

const Template: ComponentStory<typeof AnswerForm> = (args) => (
  <Center>
    <Box maxW="xl" w={"full"}>
      <AnswerForm {...args} />
    </Box>
  </Center>
);

export const Default = Template.bind({});

Default.args = {
  user: getUser(),
};
