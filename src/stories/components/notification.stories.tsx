import { ComponentStory, ComponentMeta } from "@storybook/react";
import Notification from "../../components/notification";
import getNotification from "../mocks/notification";

type Props = typeof Notification;
export default {
	title: "Components/Notification",
	component: Notification,
} as ComponentMeta<Props>;

const Template: ComponentStory<Props> = (args) => <Notification {...args} />;

export const Default = Template.bind({});
Default.args = { data: getNotification() };
