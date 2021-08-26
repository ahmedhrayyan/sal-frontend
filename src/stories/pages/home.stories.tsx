import { ComponentStory, ComponentMeta } from "@storybook/react";
import Home from "../../pages/Home";

export default {
  title: "Pages/Home",
  component: Home,
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = (args) => <Home />;

// update later
export const Default = Template.bind({});
