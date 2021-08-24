import React from "react";
import UserAvatar from "../../components/userAvatar";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Center } from "@chakra-ui/react";

export default {
  title: "Components/UserAvatar",
  component: UserAvatar,
  args: {
    name: "Hossam Okasha",
    imgSrc: "https://i.ibb.co/vYFBKQ4/11.jpg",
  },

  // decorators: [
  //   Story => <Center><Story /></Center>
  // ]
} as ComponentMeta<typeof UserAvatar>;

const Template: ComponentStory<typeof UserAvatar> = (args) => (
  <Center>
    <UserAvatar {...args} />
  </Center>
);

export const Default = Template.bind({});
Default.args = {
  title: "Software dev",
};

export const WithPlaceHolder = Template.bind({});
WithPlaceHolder.args = {
  title: "What's your question, Hossam?",
};

export const Playground = Template.bind({});
Playground.args = {
  title:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
};
