import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Box,
	Button,
	HStack,
	Text,
	ButtonGroup,
	Spacer,
	IconButton,
	Stack,
} from "@chakra-ui/react";
import { FC } from "react";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import UserAvatar from "./userAvatar";
import AnswerView from "./answerView";
import AnswerForm from "./answerForm";
import { useState, useEffect } from "react";
import { formatKNumbers, formatTimeAgo } from "../utils/helpers";
import {
	useAddFormState,
	useAppDispatch,
	useShallowEqSelector,
} from "../utils/hooks";
import {
	handleDeleteQuestion,
	handleUpdateQuestion,
	handleVoteQuestion,
} from "../redux/slices/questionsSlice";

interface QuestionViewProps {
	question: Question;
	currentUser: Profile | null;
}
const respSize = { base: "xs", md: "sm" };
const ANSWERS_PER_PAGE = 2;

const QuestionView: FC<QuestionViewProps> = ({ question, currentUser }) => {
	const [showAnswers, setShowAnswers] = useState(false);
	const [currentAnswers, setCurrentAnswers] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState(0);
	const dispatch = useAppDispatch();

	const isTheCurrentUser = question.user === currentUser?.username;

	const handleUpVote = () => {
		const qVote = question.viewer_vote;
		// upVote in case of null or false.
		const vote: Vote = !qVote ? 1 : 0;
		dispatch(handleVoteQuestion({ question, vote }));
	};

	const handleDownVote = () => {
		const qVote = question.viewer_vote;
		// downVote in case of null or true.
		const vote: Vote = qVote === null || qVote === true ? 2 : 0;
		dispatch(handleVoteQuestion({ question, vote }));
	};

	return (
		<Stack
			w="full"
			bg={"whiteAlpha.900"}
			boxShadow={["sm", "md"]}
			rounded={["none", "xl"]}
			p={[2, 6]}
			pt={[2, 4]}
			pb="2"
			fontSize={["sm", "md"]}
		>
			<HStack mr="-4" mb="4">
				<UserAvatar
					name={question.user}
					imgSrc="" //update later
					title="" //update later
				/>
				<Spacer />
				<Menu placement="bottom-end">
					<MenuButton
						as={IconButton}
						icon={<BsThreeDotsVertical size="20" />}
						color="blue.500"
						variant="ghost"
						aria-label="Edit Question"
					/>
					<MenuList>
						<MenuItem>View question</MenuItem>
						{isTheCurrentUser && (
							<>
								<MenuItem>Edit question</MenuItem>
								<MenuItem>Delete question</MenuItem>
							</>
						)}
						{isTheCurrentUser || <MenuItem>Report question</MenuItem>}
					</MenuList>
				</Menu>
			</HStack>
			<Box mb="4" dangerouslySetInnerHTML={{ __html: question.content }} />

			<HStack color="blue.500" spacing={[2, 4]}>
				<ButtonGroup
					size="md"
					variant="ghost"
					rounded={["none", "xl"]}
					isAttached
				>
					<Button
						color="blue.500"
						leftIcon={<BiUpvote size="20" />}
						mr="-px"
						pl="0"
						onClick={handleUpVote}
					>
						<Text mb="-1" as="span" ml="-1" fontSize={respSize}>
							{formatKNumbers(question.upvotes)}
						</Text>
					</Button>
					<Button
						leftIcon={<BiDownvote size="20" />}
						pl="0"
						color="gray.600"
						onClick={handleDownVote}
					>
						<Text mb="-1" as="span" ml="-1" fontSize={respSize}>
							{formatKNumbers(question.downvotes)}
						</Text>
					</Button>
				</ButtonGroup>
				<Button
					leftIcon={<RiQuestionAnswerLine size="20" />}
					border="none"
					color="blue.500"
					variant="outline"
					onClick={() => setShowAnswers(!showAnswers)}
				>
					{question.answers_count !== 0 && (
						<Text mb="-1" as="span" ml="-1" fontSize={respSize}>
							{question.answers_count}
						</Text>
					)}
				</Button>
				<Spacer />
				<Text as="span" color="gray.500" fontSize={respSize}>
					{formatTimeAgo(new Date(question.created_at))}
				</Text>
			</HStack>

			{showAnswers && (
				<>
					<AnswerForm user={currentUser} />

					{currentAnswers.length > 0 &&
						currentAnswers.map((answer) => (
							<AnswerView answer={answer} currentUser={currentUser} />
						))}
					{question.answers_count > 1 &&
						question.answers_count !== currentAnswers.length && (
							<Button onClick={() => {}} variant="link" size="sm">
								Load More
							</Button>
						)}
				</>
			)}
		</Stack>
	);
};

export default QuestionView;
