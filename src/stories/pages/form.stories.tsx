import { ComponentStory, ComponentMeta } from "@storybook/react";
import Form from "../../pages/Form";

export default {
	title: "Pages/Form",
	component: Form,
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const Login = Template.bind({});
Login.args = {
	currentForm: "sign in",
};

export const Register = Template.bind({});
Register.args = {
	currentForm: "sign up",
};
