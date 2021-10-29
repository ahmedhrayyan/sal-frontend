import {
	Box,
	Button,
	HStack,
	Text,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	ButtonGroup,
	Spacer,
	IconButton,
	useBreakpointValue,
	Stack,
	Avatar,
} from "@chakra-ui/react";
import {
	handleUpdateAnswer,
	handleVoteAnswer,
	handleDeleteAnswer,
} from "../redux/slices/answerSlice";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useShallowEqSelector, useAddFormState } from "../utils/hooks";
import { selectUser } from "../redux/slices/usersSlice";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatKNumbers, formatTimeAgo } from "../utils/helpers";
import EditForm from "./addForm";
import DeleteAlert from "./deleteAlert";

interface AnswerViewProps {
	answer: any; // update later
	currentUser: any;
}
const respSize = { base: "xs", md: "sm" };

const AnswerView: FC<AnswerViewProps> = ({ answer, currentUser }) => {
	const {
		isOpen,
		textareaValue,
		onOpen,
		onClose,
		onChangeHandler,
		onCancelHandler,
	} = useAddFormState(answer.content);
	const [isDAlert, setIsDAlert] = useState(false); // delete alert
	const user = useShallowEqSelector((state) => selectUser(state, answer.user));
	const dispatch = useDispatch();
	const respButton = useBreakpointValue([15, 20]);
	const isTheCurrentUser = answer.user === currentUser.username;

	const handleUpVote = () => {
		const aVote = answer.viewer_vote;
		// upVote in case of downVoted or no vote.
		const vote: Vote = !aVote ? 1 : 0;
		dispatch(handleVoteAnswer({ answer, vote }));
	};

	const handleDownVote = () => {
		const aVote = answer.viewer_vote;
		// downVote in case of upVoted or no vote.
		const vote: Vote = aVote === null || aVote === true ? 2 : 0;
		dispatch(handleVoteAnswer({ answer, vote }));
	};

	const handleUpdateA = () => {
		dispatch(
			handleUpdateAnswer({
				id: answer.id,
				content: textareaValue,
			})
		);
	};

	const handleDeleteA = () => {
		setIsDAlert(false);
		dispatch(handleDeleteAnswer(answer));
	};

	return (
		<HStack my="4" alignItems="start">
			<Avatar
				name={user.full_name}
				src={user.avatar || ""}
				alt="User Avatar"
				boxSize={[8, 9]}
			/>
			<Box w="full">
				<Box bg="gray.50" p="3" rounded="xl">
					<HStack mr="-3" mb="1">
						<Stack spacing={0} fontSize=".85em">
							<Text fontWeight={600}>{user.full_name}</Text>
							<Text color="gray.500">{user.job}</Text>
						</Stack>
						<Spacer />
						<Menu placement="bottom-end">
							<MenuButton
								as={IconButton}
								icon={<BsThreeDotsVertical size="20" />}
								color="blue.500"
								variant="ghost"
								aria-label="Edit Answer"
								size="sm"
							/>
							<MenuList>
								{isTheCurrentUser && (
									<>
										<MenuItem onClick={onOpen}>Edit answer</MenuItem>
										<MenuItem onClick={() => setIsDAlert(true)}>
											Delete answer
										</MenuItem>
									</>
								)}
								{isTheCurrentUser || <MenuItem>Report answer</MenuItem>}
							</MenuList>
						</Menu>
					</HStack>
					{/* Delete Alert */}
					<DeleteAlert
						label={"Answer"}
						onDeleteHandler={handleDeleteA}
						isOpen={isDAlert}
						onClose={() => setIsDAlert(false)}
					/>
					{/* Edit Form*/}
					<EditForm
						textareaValue={textareaValue.replace(/(<([^>]+)>)/gi, "")} //remove html tags.
						onChangeHandler={onChangeHandler}
						isOpen={isOpen}
						onClose={onClose}
						onAddHandler={handleUpdateA}
						onCancelHandler={onCancelHandler}
						user={currentUser}
						isEditForm // edit form
						hasImageFeature
					/>
					<Box mb="4" dangerouslySetInnerHTML={{ __html: answer.content }} />
				</Box>
				<HStack color="blue.500" spacing={[2, 4]} mt="4px">
					<ButtonGroup
						size="xs"
						variant="ghost"
						rounded={["none", "xl"]}
						isAttached
					>
						<Button
							leftIcon={<BiUpvote size={respButton} />}
							mr="-px"
							pl="2"
							onClick={handleUpVote}
						>
							<Text mb="-1" as="span" ml="-1" fontSize={respSize}>
								{answer.upvotes !== 0 && formatKNumbers(answer.upvotes)}
							</Text>
						</Button>
						<Button
							leftIcon={<BiDownvote size={respButton} />}
							pl="0"
							color="gray.600"
							onClick={handleDownVote}
						>
							<Text mb="-1" as="span" ml="-1" fontSize={respSize}>
								{answer.downvotes !== 0 && formatKNumbers(answer.downvotes)}
							</Text>
						</Button>
					</ButtonGroup>
					<Text as="span" color="gray.500" fontSize={respSize}>
						{formatTimeAgo(new Date(answer.created_at))}
					</Text>
				</HStack>
			</Box>
		</HStack>
	);
};

export default AnswerView;
