import { ComponentStory, ComponentMeta } from "@storybook/react";
import Notifications from "../../pages/Notifications";

type Props = typeof Notifications;
export default {
	title: "Pages/Notifications",
	component: Notifications,
} as ComponentMeta<Props>;

const Template: ComponentStory<Props> = (args) => <Notifications {...args} />;
export const Default = Template.bind({});
