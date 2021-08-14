import { Button, Stack, Center } from "@chakra-ui/react";
import QuestionView from "../components/questionView";

const Question = () => {
  return (
    <Center>
      <Stack
        w={["full", "90vw"]}
        maxW={"xl"}
        spacing="2"
        alignItems="flex-start"
      >
        <Button
          bg={"blue.500"}
          rounded={"full"}
          color={"white"}
          w={[20, 32]}
          h={[7, 10]}
          _hover={{ bg: "blue.600" }}
          _focus={{ bg: "blue.600" }}
        >
          Back
        </Button>
        <QuestionView />
      </Stack>
    </Center>
  );
};

export default Question;