import { Box, Center } from "@chakra-ui/layout";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import AnswerView from "../../components/answerView";
import getAnswer from "../mocks/answer";
import getUser from "../mocks/user";

export default {
	title: "Components/AnswerView",
	component: AnswerView,
	args: {
		authToken: "",
	},
} as ComponentMeta<typeof AnswerView>;

const Template: ComponentStory<typeof AnswerView> = (args) => (
	<Center>
		<Box maxW="xl" w={"full"} bg="white" p={[2, 6]} boxShadow={["sm", "md"]}
			rounded={["none", "xl"]}>
			<AnswerView {...args} />
		</Box>
	</Center>
);

export const Default = Template.bind({});

Default.args = {
	currentUser: getUser(),
	answer: getAnswer(),
};

export const LongAnswer = Template.bind({});

LongAnswer.args = {
	currentUser: getUser(),
	answer: getAnswer({
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	}),
};

export const NotCurrentUserAnswer = Template.bind({});

NotCurrentUserAnswer.args = {
	currentUser: getUser({ username: "test" }),
	answer: getAnswer(),
};
