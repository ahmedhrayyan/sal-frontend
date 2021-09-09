import {
  Button,
  HStack,
  Avatar,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { FC, FormEvent, useState } from "react";

import AddForm from "./AddForm";

interface AnswerFormProps {
  user: any;
}

const AnswerForm: FC<AnswerFormProps> = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal
  const [textareaValue, setTextareaValue] = useState("");

  const onChangeHandler = (e: FormEvent<HTMLTextAreaElement>): void => {
    setTextareaValue(e.currentTarget.value);
  };

  const onCancelHandler = () => {
    setTextareaValue("");
    onClose();
  };

  return (
    <>
      <Divider />
      <HStack onClick={onOpen} mt="3">
        <Avatar boxSize={[8, 9]} name={user.full_name} src={user.avatar} />
        <Button
          variant="outline"
          fontWeight="500"
          fontSize={["xs", "sm"]}
          justifyContent="start"
          color="gray.500"
          w="full"
          isTruncated
        >
          {
            // disable title change while opening the modal
            (!isOpen ? textareaValue : false) || "Write your answer"
          }
        </Button>
        <AddForm
          textareaValue={textareaValue}
          onChangeHandler={onChangeHandler}
          hasImageFeature
          isOpen={isOpen}
          onClose={onClose}
          onAddHandler={() => {}}
          onCancelHandler={onCancelHandler}
          user={user}
        />
      </HStack>
    </>
  );
};

export default AnswerForm;
