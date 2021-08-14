import {
  Button,
  HStack,
  Avatar,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { FunctionComponent, FormEvent, useState } from "react";

import AddForm from "./addForm";

interface AnswerFormProps {}

const AnswerForm: FunctionComponent<AnswerFormProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal
  const [textareaValue, setTextareaValue] = useState("");

  const onChangeHandler = (e: FormEvent<HTMLTextAreaElement>): void => {
    setTextareaValue(e.currentTarget.value);
  };

  const onCancelHandler = () => {
    onClose();
    setTextareaValue("");
  };

  return (
    <>
      <Divider />
      <HStack onClick={onOpen} mt="3">
        <Avatar boxSize={[8, 9]} name="John Doe" />
        <Button
          variant="outline"
          fontWeight="500"
          fontSize={["xs", "sm"]}
          justifyContent="start"
          color="gray.500"
          rounded="full"
          w="full"
          onMouseDown={(e) => e.preventDefault()} // remove focus after click
        >
          Write your answer
        </Button>
        <AddForm
          textareaValue={textareaValue}
          onChangeHandler={onChangeHandler}
          hasImageFeature
          isOpen={isOpen}
          onClose={onClose}
          onAddHandler={() => {}}
          onCancelHandler={onCancelHandler}
        />
      </HStack>
    </>
  );
};

export default AnswerForm;