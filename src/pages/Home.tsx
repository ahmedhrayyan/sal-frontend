import { Center, VStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import QuestionForm from "../components/questionForm";

interface HomeProps {}

const Home: FunctionComponent = () => {
	return (
		<Center mt="4vh">
			<VStack w={["full", "90vw"]} maxW={"xl"} spacing="6">
				<QuestionForm />
				{/* <QuestionView />*/}
			</VStack>
		</Center>
	);
};

export default Home;
