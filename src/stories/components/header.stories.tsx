import { ComponentStory, ComponentMeta } from "@storybook/react";
import Header from "../../components/header";
import getUser from "../mocks/user";

export default {
	title: "Components/Header",
	component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
	profile: getUser() as Profile,
};
