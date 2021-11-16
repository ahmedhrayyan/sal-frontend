import LoadingLogo from "../../components/loadingLogo";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Flex } from "@chakra-ui/react";

export default {
	title: "Components/LoadingLogo",
	component: LoadingLogo,
} as ComponentMeta<typeof LoadingLogo>;

const Template: ComponentStory<typeof LoadingLogo> = (args) => (
	<LoadingLogo {...args} />
);

export const Default = Template.bind({});
export const centered = Template.bind({});
centered.decorators = [
	(StoryFn) => (
		<Flex w="100vw" h="100vh" justify="center" align="center">
			<StoryFn />
		</Flex>
	),
];
