import {
	Box,
	Button,
	Stack,
	Center,
	SkeletonCircle,
	SkeletonText,
} from "@chakra-ui/react";
import { useParams, useHistory } from "react-router-dom";
import QuestionView from "../components/questionView";
import { FC, useEffect } from "react";
import {
	useShallowEqSelector,
	useAppDispatch,
	useSearch,
} from "../utils/hooks";
import { selectProfile } from "../redux/slices/profileSlice";
import {
	handleShowQuestion,
	selectQStatus,
	selectQuestion,
} from "../redux/slices/questionsSlice";
import NoResult from "../components/noResult";
import { handleShowAnswer, selectAnswer } from "../redux/slices/answerSlice";

interface QuestionViewProps {}
const Question: FC<QuestionViewProps> = () => {
	const history = useHistory();
	const { qId } = useParams() as { qId: string | undefined };
	const aId = useSearch("answer_id").getValue();
	const currentUser = useShallowEqSelector(selectProfile);
	const qStatus = useShallowEqSelector(selectQStatus);

	const dispatch = useAppDispatch();
	const question = useShallowEqSelector((state) =>
		selectQuestion(state, Number(qId))
	);

	const answer = useShallowEqSelector((state) =>
		selectAnswer(state, Number(aId))
	);

	useEffect(() => {
		if (!question) dispatch(handleShowQuestion(Number(qId)));
		// if(qStatus === 'failed') history.
	}, [question, qId]); // eslint-disable-line

	useEffect(() => {
		if (aId && !answer) dispatch(handleShowAnswer(Number(aId)));
	}, [aId]); // eslint-disable-line

	return (
		<Center mt={["13vh", "16vh"]}>
			<Stack
				w={["full", "90vw"]}
				maxW={"xl"}
				spacing="2"
				alignItems="flex-start"
			>
				<Button onClick={() => history.goBack()} w={[20, 32]} h={[7, 10]}>
					Back
				</Button>
				{qStatus === "failed" && (
					<NoResult
						heading="This Page Isn't Available Right Now"
						text="This may be because of a technical error that we're working to get fixed. Try reloading this page."
					/>
				)}
				{qStatus === "failed" ||
					(!question ? (
						<Box padding="6" boxShadow="lg" bg="white" w="full">
							<SkeletonCircle size="10" />
							<SkeletonText mt="4" noOfLines={4} spacing="4" />
						</Box>
					) : (
						<QuestionView
							answerId={aId}
							question={question}
							currentUser={currentUser}
							qPage
						/>
					))}
			</Stack>
		</Center>
	);
};

export default Question;
