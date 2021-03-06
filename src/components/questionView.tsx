import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Flex,
	Box,
	Button,
	HStack,
	Text,
	ButtonGroup,
	Spacer,
	IconButton,
	Stack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FC, useEffect } from "react";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import UserAvatar from "./userAvatar";
import AnswerView from "./answerView";
import AnswerForm from "./answerForm";
import { useState } from "react";
import { formatKNumbers } from "../utils/helpers";
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
import {
	handleLoadAnswers,
	selectNextAPage,
	selectAnswers,
	selectAStatus,
} from "../redux/slices/answerSlice";
import DeleteAlert from "./deleteAlert";
import EditForm from "./addForm";
import { selectUser } from "../redux/slices/usersSlice";
import { timeSince } from "../utils/date";

interface QuestionViewProps {
	question: Question;
	currentUser: Profile | null;
	qPage?: Boolean; // open answers in Q Page by default
	answerId?: string | undefined;
}
const respSize = { base: "xs", md: "sm" };

const QuestionView: FC<QuestionViewProps> = ({
	question,
	currentUser,
	qPage,
	answerId,
}) => {
	const {
		isOpen,
		textareaValue,
		onOpen,
		onClose,
		onChangeHandler,
		onCancelHandler,
	} = useAddFormState(question.content);
	const [showAnswers, setShowAnswers] = useState(false);
	const [isDAlert, setIsDAlert] = useState(false); // delete alert
	const dispatch = useAppDispatch();
	const answers = useShallowEqSelector((state) =>
		selectAnswers(state, question.id)
	);
	const aStatus = useShallowEqSelector(selectAStatus);
	const nextAPage = useShallowEqSelector((state) =>
		selectNextAPage(state, question.id)
	);
	const isTheCurrentUser = question.user === currentUser?.username;
	const qUser = useShallowEqSelector((state) =>
		selectUser(state, question.user)
	);

	useEffect(() => {
		if (qPage) handleShowAnswers();
	}, [qPage]); // eslint-disable-line

	/* --- Questions Handlers --- */
	const handleUpVote = () => {
		const qVote = question.viewer_vote;
		// upVote(=1) in case of null or false.
		const vote: Vote = !qVote ? 1 : 0;
		dispatch(handleVoteQuestion({ question, vote }));
	};

	const handleDownVote = () => {
		const qVote = question.viewer_vote;
		// downVote(=2) in case of null or true.
		const vote: Vote = qVote === null || qVote === true ? 2 : 0;
		dispatch(handleVoteQuestion({ question, vote }));
	};

	const handleUpdateQ = () => {
		dispatch(
			handleUpdateQuestion({
				id: question.id,
				content: textareaValue,
			})
		);
	};

	const handleDeleteQ = () => {
		setIsDAlert(false);
		dispatch(handleDeleteQuestion(question));
	};

	/* --- Answers Handlers --- */
	const handleShowAnswers = () => {
		// Don't send req if the answers showed before or the Q has no answers.
		if (answers.length === 0 && question.answers_count !== 0) {
			dispatch(handleLoadAnswers({ qId: question.id, page: nextAPage }));
		}
		setShowAnswers((showAnswers) => !showAnswers);
	};

	const handleLoadMoreA = () => {
		dispatch(handleLoadAnswers({ qId: question.id, page: Number(nextAPage) }));
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
			<Flex mr="-4" mb="4">
				<UserAvatar
					name={qUser?.full_name as string}
					imgSrc={qUser?.avatar || ""}
					title={qUser?.job || ""}
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
						<MenuItem as={RouterLink} to={`/questions/${question.id}`}>
							View question
						</MenuItem>
						{isTheCurrentUser && (
							<>
								<MenuItem onClick={onOpen}>Edit question</MenuItem>
								<MenuItem onClick={() => setIsDAlert(true)}>
									Delete question
								</MenuItem>
							</>
						)}
						{isTheCurrentUser || <MenuItem>Report question</MenuItem>}
					</MenuList>
				</Menu>
			</Flex>
			<DeleteAlert
				label="Question"
				onDeleteHandler={handleDeleteQ}
				isOpen={isDAlert}
				onClose={() => setIsDAlert(false)}
			/>
			<EditForm
				textareaValue={textareaValue}
				onChangeHandler={onChangeHandler}
				isOpen={isOpen}
				onClose={onClose}
				onAddHandler={handleUpdateQ}
				onCancelHandler={onCancelHandler}
				user={currentUser}
				isQuestion
				isEditForm
			/>
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
					onClick={handleShowAnswers}
				>
					{question.answers_count !== 0 && (
						<Text mb="-1" as="span" ml="-1" fontSize={respSize}>
							{question.answers_count}
						</Text>
					)}
				</Button>
				<Spacer />
				<Text as="span" color="gray.500" fontSize={respSize}>
					{timeSince(question.created_at)} ago
				</Text>
			</HStack>

			{showAnswers && (
				<>
					<AnswerForm user={currentUser} question_id={question.id} />

					{answers.length > 0 &&
						answers.map((answer) => (
							<AnswerView
								key={answer.id}
								answer={answer}
								currentUser={currentUser}
								scrollToAns={Number(answerId) === answer.id}
							/>
						))}
					{question.answers_count > 0 &&
						question.answers_count !== answers.length && (
							<Button
								onClick={handleLoadMoreA}
								variant="link"
								size="sm"
								isLoading={aStatus === "pending"}
							>
								Load More
							</Button>
						)}
				</>
			)}
		</Stack>
	);
};

export default QuestionView;
