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
	handleSearchQuestions,
	selectNextQPage,
	selectQuestions,
	selectNextQSearchedPage,
	clearSearch,
} from "../redux/slices/questionsSlice";
import { useAppDispatch, useShallowEqSelector } from "../utils/hooks";
import { useHistory, useLocation } from "react-router";

interface HomeProps {
	isSearchPage?: boolean;
}
const Home: FC<HomeProps> = ({ isSearchPage }) => {
	const dispatch = useAppDispatch();
	const profile = useShallowEqSelector(selectProfile);
	const questions = useShallowEqSelector(selectQuestions);
	const nextQPage = useShallowEqSelector(selectNextQPage);
	const nextQSearchedPage = useShallowEqSelector(selectNextQSearchedPage);
	const respSize = useBreakpointValue({ base: "sm", md: "md" });

	const { search } = useLocation(); //cuurent URL
	const params = new URLSearchParams(search);
	const history = useHistory();

	// Home Page
	useEffect(() => {
		if (!isSearchPage) {
			dispatch(handleLoadQuestions(1));
			document.title = "Sal - Home";
		}
	}, []); //eslint-disable-line

	// Search Page
	useEffect(() => {
		if (isSearchPage) {
			dispatch(clearSearch());
			if (params.get("searchTerm")) {
				const searchTerm = params.get("searchTerm") as string;
				dispatch(
					handleSearchQuestions({
						searchTerm,
						page: 1,
					})
				);
				document.title = `${searchTerm} - Search Results | Sal`;
			}
		}
	}, [search]); //eslint-disable-line

	useEffect(() => {
		if (isSearchPage) {
			history.listen((location) => {
				if (history.action === "POP") {
					window.location.href = window.location.origin;
				}
			});
		}
	});

	const handleLoadMore = () => {
		if (isSearchPage && params.get("searchTerm")) {
			// Search Page
			dispatch(
				handleSearchQuestions({
					searchTerm: params.get("searchTerm") as string,
					page: nextQSearchedPage,
				})
			);
		} else {
			// Home Page
			dispatch(handleLoadQuestions(nextQPage));
		}
	};

	return (
		<Center mt="13vh">
			<VStack maxW="xl" w="full" spacing="6">
				{isSearchPage ? (
					// Search Page
					<Button
						alignSelf="start"
						onClick={() => {
							window.location.href = window.location.origin; // Force reload
						}}
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
					// Loading
					? [...Array(20)].map((_, index) => (
							<Box key={index} padding="6" boxShadow="lg" bg="white" w="full">
								<SkeletonCircle size="10" />
								<SkeletonText mt="4" noOfLines={4} spacing="4" />
							</Box>
					  ))
					// Questions
					: questions.ids.map((id) => (
							<QuestionView
								key={id}
								question={questions.entities[id]!}
								currentUser={profile}
							/>
					  ))}
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
