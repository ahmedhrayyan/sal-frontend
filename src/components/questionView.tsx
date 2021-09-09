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
import UserAvatar from "./UserAvatar";
import AnswerView from "./AnswerView";
import AnswerForm from "./AnswerForm";
import { useState, useEffect } from "react";
import { formatKNumbers, formatTimeAgo } from "../utils/helpers";

interface QuestionViewProps {
	question: any; //no redux yet
	currentUser: any;
	authToken: string;
}
const respSize = { base: "xs", md: "sm" };
const ANSWERS_PER_PAGE = 2;

const QuestionView: FC<QuestionViewProps> = ({
	question,
	currentUser,
	authToken,
}) => {
	const [showAnswers, setShowAnswers] = useState(false);
	const [currentAnswers, setCurrentAnswers] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		if (question.data && question.data.answers.length > 0)
			setCurrentAnswers([{ ...question.data.answers[0] }]);
	}, []);

	const handleLoadMore = () => {
		const answers = question.data.answers;
		// shallow copy is ok here
		setCurrentAnswers(
			answers.slice(
				0,
				currentPage * question.data.answers_count + ANSWERS_PER_PAGE
			)
		);
		setCurrentPage((currentPage) => currentPage + 1);
	};

	const isTheCurrentUser = question.data.user.id === currentUser.id;
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
					name={question.data.user.full_name}
					imgSrc={question.data.user.avatar}
					title={question.data.user.job}
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
			<Box mb="4" dangerouslySetInnerHTML={{ __html: question.data.content }} />

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
					>
						<Text mb="-1" as="span" ml="-1" fontSize={respSize}>
							{formatKNumbers(question.data.upVotes)}
						</Text>
					</Button>
					<Button leftIcon={<BiDownvote size="20" />} pl="0" color="gray.600">
						<Text mb="-1" as="span" ml="-1" fontSize={respSize}>
							{formatKNumbers(question.data.downVotes)}
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
					{question.data.answers_count !== 0 && (
						<Text mb="-1" as="span" ml="-1" fontSize={respSize}>
							{question.data.answers_count}
						</Text>
					)}
				</Button>
				<Spacer />
				<Text as="span" color="gray.500" fontSize={respSize}>
					{formatTimeAgo(new Date(question.data.created_at))}
				</Text>
			</HStack>

			{showAnswers && (
				<>
					<AnswerForm user={currentUser} />

					{currentAnswers.length > 0 &&
						currentAnswers.map((answer) => (
							<AnswerView
								answer={answer}
								authToken={authToken}
								currentUser={currentUser}
							/>
						))}
					{question.data.answers.length > 1 &&
						question.data.answers.length !== currentAnswers.length && (
							<Button onClick={handleLoadMore} variant="link" size="sm">
								Load More
							</Button>
						)}
				</>
			)}
		</Stack>
	);
};

export default QuestionView;
