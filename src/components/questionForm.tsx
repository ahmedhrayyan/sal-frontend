import { Box, useDisclosure } from "@chakra-ui/react";
import { FunctionComponent, useState, FormEvent } from "react";
import AddForm from "./addForm";
import UserAvatar from "./userAvatar";

interface QuestionFormProps {
  user: any;
}
const QuestionForm: FunctionComponent<QuestionFormProps> = ({ user }) => {
  const [textareaValue, setTextareaValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal

  const onChangeHandler = (e: FormEvent<HTMLTextAreaElement>): void => {
    setTextareaValue(e.currentTarget.value);
  };

  const onCancelHandler = () => {
    onClose();
    setTextareaValue("");
  };

  return (
    <>
      <Box
        w="full"
        bg={"whiteAlpha.900"}
        boxShadow={["sm", "md"]}
        rounded={["none", "xl"]}
        _hover={{ cursor: "pointer" }}
        onClick={onOpen}
        p="6"
        pt="4"
      >
        <UserAvatar
          name={user.full_name}
          title={
            // disable title change while opening the modal
            (!isOpen ? textareaValue : false) ||
            `What's your question, ${user.first_name.split(" ")[0]}?`
          }
          imgSrc={user.avatar}
        />
      </Box>
      <AddForm
        textareaValue={textareaValue}
        onChangeHandler={onChangeHandler}
        isQuestion
        isOpen={isOpen}
        onClose={onClose}
        onAddHandler={({}) => {}}
        onCancelHandler={onCancelHandler}
        user={user}
      />
    </>
  );
};

export default QuestionForm;
