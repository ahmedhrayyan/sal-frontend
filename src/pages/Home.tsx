import { FC, useEffect } from "react";
import {
	Box,
	Center,
	VStack,
	Button,
	SkeletonCircle,
	SkeletonText,
	useBreakpointValue,
} from "@chakra-ui/react";

import QuestionForm from "../components/questionForm";
import QuestionView from "../components/questionView";

import { selectProfile } from "../redux/slices/profileSlice";
import {
	handleLoadQuestions,
	selectNextQPage,
	selectQuestions,
} from "../redux/slices/questionsSlice";
import { useAppDispatch, useShallowEqSelector } from "../utils/hooks";

// add props after redux
const Home: FC = () => {
	const dispatch = useAppDispatch();
	const profile = useShallowEqSelector(selectProfile);
	const questions = useShallowEqSelector(selectQuestions);
	const nextQPage = useShallowEqSelector(selectNextQPage);
	const respSize = useBreakpointValue({ base: "sm", md: "md" });
	useEffect(() => {
		dispatch(handleLoadQuestions(nextQPage));
	}, []);

	return (
		<Center mt="13vh">
			<VStack maxW="xl" w="full" spacing="6">
				<QuestionForm user={profile} />
				{questions.ids.map((id) => (
					<QuestionView
						key={id}
						question={questions.entities[id]!}
						currentUser={profile}
					/>
				))}
				{questions.status === "pending" &&
					[...Array(20)].map((_, index) => (
						<Box key={index} padding="6" boxShadow="lg" bg="white" w="full">
							<SkeletonCircle size="10" />
							<SkeletonText mt="4" noOfLines={4} spacing="4" />
						</Box>
					))}
				{questions.ids.length === questions.total || (
					<>
					<Button
						size={respSize}
						onClick={() => {
							dispatch(handleLoadQuestions(nextQPage));
						}}
					>
						Load More
					</Button>
					<Box/>
					</>
				)}
			</VStack>
		</Center>
	);
};

export default Home;	
