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
import { FunctionComponent } from "react";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import UserAvatar from "./userAvatar";
import AnswerView from "./answerView";
import AnswerForm from "./answerForm";
import { useState } from "react";
import { formatKNumbers } from "../helpers/index";

interface QuestionViewProps {
	question: any; //no redux yet
	currentUser: any;
	authToken: string;
}

const respSize = { base: "xs", md: "sm" };
const QuestionView: FunctionComponent<QuestionViewProps> = ({
	question,
	currentUser,
	authToken,
}) => {
	const [showAnswers, setShowAnswers] = useState(false);
	const isTheCurrentUser = question.data.user.id === currentUser.id;
	return (
		<Stack
			w="full"
			bg={"whiteAlpha.900"}
			boxShadow={["sm", "md"]}
			rounded={["none", "xl"]}
			p="6"
			py="4"
			pb="2"
			fontSize={["sm", "md"]}
		>
			<HStack mr="-4" mb="4">
				<UserAvatar
					name="Hossam Okasha"
					imgSrc="https://i.ibb.co/vYFBKQ4/11.jpg"
					title="software dev"
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

			<HStack color="blue.500" spacing={[2, 4]} ml="-2">
				<ButtonGroup
					size="md"
					variant="ghost"
					rounded={["none", "xl"]}
					isAttached
				>
					<Button
						onMouseDown={(e) => e.preventDefault()} // remove focus after click
						leftIcon={<BiUpvote size="20" />}
						mr="-px"
						pl="2"
					>
						<Text mb="-1" as="span" ml="-1" fontSize={respSize}>
              {formatKNumbers(question.data.upVotes)}
            </Text>
          </Button>
					<Button
						onMouseDown={(e) => e.preventDefault()} // remove focus after click
						leftIcon={<BiDownvote size="20" />}
						pl="0"
						color="gray.600"
					>
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
					onMouseDown={(e) => e.preventDefault()} // remove focus after click
				>
					<Text mb="-1" as="span" ml="-1" fontSize={respSize}>
						3
					</Text>
				</Button>
				<Spacer />
				<Text as="span" color="gray.500" fontSize={respSize}>
					2 hours ago
				</Text>
			</HStack>

			{showAnswers && (
				<>
					<AnswerForm user={currentUser} />
					<AnswerView
						answer={question.data.answers[0]}
						authToken={authToken}
						currentUser={question.data.user}
					/>
				</>
			)}
		</Stack>
	);
};

export default QuestionView;
