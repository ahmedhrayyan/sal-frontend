import { ComponentStory, ComponentMeta } from "@storybook/react";
import AddForm from "../../components/addForm";


export default {
  title: "Components/AddForm",
  component: AddForm,
} as ComponentMeta<typeof AddForm>;

const Template: ComponentStory<typeof AddForm> = (args) => (
  <AddForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isQuestion: true,
  isOpen: true,
  textareaValue: "",
  hasImageFeature: false,
  onChangeHandler: () => {},
  onAddHandler: () => {},
  onClose: () => {},
  onCancelHandler: () => {},
};



export const isAnswer = Template.bind({});
isAnswer.args = {
  ...Default.args,
  hasImageFeature: true,
  isQuestion: false,
};