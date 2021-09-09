import { Center, VStack } from "@chakra-ui/react";
import { FC } from "react";

import QuestionForm from "../components/questionForm";
import QuestionView from "../components/questionView";

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

export const fakeQuestion = {
	data: {
		accepted_answer: null,
		answers: [
			{
				content: "<p>yup</p>",
				created_at: "Thu, 19 Aug 2021 18:24:40 GMT",
				id: 1,
				question_id: 1,
				upVotes: 20,
				downVotes: 6,
				user: {
					avatar: null,
					created_at: "Sat, 10 Jul 2021 13:14:28 GMT",
					email: "ahmedhrayyan@outlook.com",
					first_name: "Ahmed",
					id: 2,
					job: "Engineer",
					last_name: "Hamed",
					full_name: "Ahmed Hamed",
					phone: null,
					username: "ahmedhrayyan",
				},
			},
		],
		answers_count: 1,
		content: "Is this the best site in the world?",
		created_at: "Mon, 12 Jul 2021 09:32:03 GMT",
		id: 1,
		prime_answer: null,
		upVotes: 1000,
		downVotes: 3,
		user: {
			avatar: "https://i.ibb.co/vYFBKQ4/11.jpg",
			created_at: "Sat, 10 Jul 2021 13:14:28 GMT",
			email: "ahmedhrayyan@outlook.com",
			first_name: "Hossam",
			full_name: "Hossam Okasha",
			id: 1,
			job: "software dev",
			last_name: "Okasha",
			phone: null,
			username: "",
		},
	},
	success: true,
};

// add props after redux
const Home: FC = () => {
	return (
		<Center>
			<VStack maxW="xl" w="full" spacing="6">
				<QuestionForm user={currentUser} />
				<QuestionView
					question={fakeQuestion}
					currentUser={currentUser}
					authToken=""
				/>
			</VStack>
		</Center>
	);
};

export default Home;
