import { VStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import QuestionForm from "../components/questionForm";

interface HomeProps {}

const Home: FunctionComponent = () => {
  return (
    <VStack>
      <QuestionForm />
      {/* <Questions /> */}
    </VStack>
  );
};

export default Home;
