import { ComponentStory, ComponentMeta } from "@storybook/react";
import Authentication from "../../pages/Authentication";

export default {
	title: "Pages/Authentication",
	component: Authentication,
} as ComponentMeta<typeof Authentication>;

const Template: ComponentStory<typeof Authentication> = (args) => (
	<Authentication {...args} />
);

export const Default = Template.bind({});
