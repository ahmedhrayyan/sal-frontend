import { Box, Center, useDisclosure } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import UserAvatar from "./userAvatar";
import AddForm from "./addForm";

interface QuestionProps {}

const QuestionForm: FunctionComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Center>
        <Box
          w={["full", "90vw"]}
          maxW={"xl"}
          bg={"whiteAlpha.900"}
          boxShadow={["sm", "md"]}
          rounded={["none", "xl"]}
          _hover={{ cursor: "pointer" }}
          onClick={onOpen}
          p="6"
          pt="4"
          pb="8"
        >
          <UserAvatar name="John Doe" title="Software Dev" />
          <AddForm hasImageFeature isQuestion isOpen={isOpen} onClose={onClose} />
        </Box>
      </Center>
    </>
  );
};

export default QuestionForm;