import { ComponentStory, ComponentMeta } from "@storybook/react";
import Authentication from "../../pages/Authentication";

export default {
	title: "Pages/Form",
	component: Authentication,
} as ComponentMeta<typeof Authentication>;

const Template: ComponentStory<typeof Authentication> = (args) => <Authentication {...args} />;

export const Login = Template.bind({});
Login.args = {
	currentForm: "sign in",
};

export const Register = Template.bind({});
Register.args = {
	currentForm: "sign up",
};
