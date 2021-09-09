import { Button, Stack, Center } from "@chakra-ui/react";
import QuestionView from "../components/QuestionView";
import { FunctionComponent } from "react";

interface QuestionViewProps {
  question: any; //no redux yet
  authToken: string;
  currentUser: any;
}
const Question: FunctionComponent<QuestionViewProps> = ({
  question,
  currentUser,
}) => {
  return (
    <Center>
      <Stack
        w={["full", "90vw"]}
        maxW={"xl"}
        spacing="2"
        alignItems="flex-start"
      >
        <Button w={[20, 32]} h={[7, 10]}>
          Back
        </Button>
        <QuestionView
          question={question}
          currentUser={currentUser}
          authToken=""
        />
      </Stack>
    </Center>
  );
};

export default Question;
