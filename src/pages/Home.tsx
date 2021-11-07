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
	clearSearch,
} from "../redux/slices/questionsSlice";
import {
	useAppDispatch,
	useSearch,
	useShallowEqSelector,
} from "../utils/hooks";
import { useHistory } from "react-router";
import NoResult from "../components/noResult";

const Home: FC = () => {
	const dispatch = useAppDispatch();
	const profile = useShallowEqSelector(selectProfile);
	const questions = useShallowEqSelector(selectQuestions);
	const page = useShallowEqSelector(selectNextQPage);
	const respSize = useBreakpointValue({ base: "sm", md: "md" });

	const search = useSearch("searchTerm").getValue();
	const history = useHistory();

	// Home Page
	useEffect(() => {
		dispatch(clearSearch());
		dispatch(handleLoadQuestions({ page: 1, search }));
		document.title = search ? `${search} - Search Results | Sal` : "Sal - Home";
	}, [search]); //eslint-disable-line

	const handleLoadMore = () => {
		dispatch(handleLoadQuestions({ page, search }));
	};

	return (
		<Center mt={["13vh", "16vh"]}>
			<VStack maxW="xl" w="full" spacing="6">
				{search ? (
					// Search Page
					<Button
						alignSelf="start"
						onClick={() => history.push("/")}
						w={[20, 32]}
						h={[7, 10]}
					>
						Back
					</Button>
				) : (
					//Home Page
					<QuestionForm user={profile} />
				)}
				{questions.status === "pending"
					? // Loading
					  [...Array(20)].map((_, index) => (
							<Box key={index} padding="6" boxShadow="lg" bg="white" w="full">
								<SkeletonCircle size="10" />
								<SkeletonText mt="4" noOfLines={4} spacing="4" />
							</Box>
					  ))
					: // Questions
					  questions.ids.map((id) => (
							<QuestionView
								key={id}
								question={questions.entities[id]!}
								currentUser={profile}
							/>
					  ))}
				{search && questions.ids.length === 0 && <NoResult />}
				{questions.ids.length === questions.total || (
					<>
						<Button size={respSize} onClick={handleLoadMore}>
							Load More
						</Button>
						<Box />
					</>
				)}
			</VStack>
		</Center>
	);
};

export default Home;
