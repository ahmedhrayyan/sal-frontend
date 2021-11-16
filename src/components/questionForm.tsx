import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { handleAddQuestion } from "../redux/slices/questionsSlice";
import { useAppDispatch, useAddFormState } from "../utils/hooks";
import AddForm from "./addForm";
import UserAvatar from "./userAvatar";

interface QuestionFormProps {
	user: any;
}
const QuestionForm: FC<QuestionFormProps> = ({ user }) => {
	const {
		isOpen,
		textareaValue,
		onOpen,
		onClose,
		onChangeHandler,
		onCancelHandler,
	} = useAddFormState("");
	const dispatch = useAppDispatch();

	return (
		<>
			<Box
				w="full"
				bg={"whiteAlpha.900"}
				boxShadow={["sm", "md"]}
				rounded={["none", "xl"]}
				_hover={{ cursor: "pointer" }}
				onClick={onOpen}
				p={[2, 6]}
				pt={[2, 4]}
			>
				<UserAvatar
					name={user.full_name}
					title={
						// disable title change while opening the modal
						(!isOpen ? textareaValue : false) ||
						`What's your question, ${user.first_name.split(" ")[0]}?`
					}
					imgSrc={user.avatar}
				/>
			</Box>
			<AddForm
				textareaValue={textareaValue}
				onChangeHandler={onChangeHandler}
				isQuestion
				isOpen={isOpen}
				onClose={onClose}
				onAddHandler={() => dispatch(handleAddQuestion(textareaValue))} // eslint-disable-line
				onCancelHandler={onCancelHandler}
				user={user}
			/>
		</>
	);
};

export default QuestionForm;
