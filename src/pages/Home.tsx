import { Center, VStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import QuestionForm from "../components/questionForm";

interface HomeProps {}
export const currentUser = {
  avatar: "https://i.ibb.co/vYFBKQ4/11.jpg",
  created_at: "Sat, 10 Jul 2021 13:14:28 GMT",
  email: "ahmedhrayyan@outlook.com",
  first_name: "Hossam",
  id: 1,
  job: "software dev",
  last_name: "Okasha",
  full_name: "Hossam Okasha",
  phone: null,
  username: "",
};
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
