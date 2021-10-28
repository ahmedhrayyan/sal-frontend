import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Box, Center } from "@chakra-ui/layout";
import QuestionView from "../../components/questionView";
import getQuestion from "../mocks/question";
import getUser from "../mocks/user";

export default {
	title: "Components/QuestionView",
	component: QuestionView,
	args: {
		currentUser: getUser({ username: "test" }),
	},
} as ComponentMeta<typeof QuestionView>;

const Template: ComponentStory<typeof QuestionView> = (args) => (
	<Center>
		<Box maxW="xl" w="full">
			<QuestionView {...args} />
		</Box>
	</Center>
);

export const Default = Template.bind({});
Default.args = {
	question: getQuestion(),
};
