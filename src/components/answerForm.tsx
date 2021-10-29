import { Button, HStack, Avatar, Divider } from "@chakra-ui/react";
import { FC } from "react";
import { handleAddAnswer } from "../redux/slices/answerSlice";
import { useAddFormState, useAppDispatch } from "../utils/hooks";
import AddForm from "./addForm";

interface AnswerFormProps {
	user: any;
	question_id: number;
}

const AnswerForm: FC<AnswerFormProps> = ({ user, question_id }) => {
	const dispatch = useAppDispatch();
	const {
		isOpen,
		onOpen,
		onClose,
		textareaValue,
		onChangeHandler,
		onCancelHandler,
	} = useAddFormState("");

	return (
		<>
			<Divider />
			<HStack onClick={onOpen} mt="3">
				<Avatar boxSize={[8, 9]} name={user.full_name} src={user.avatar} />
				<Button
					variant="outline"
					fontWeight="500"
					fontSize={["xs", "sm"]}
					justifyContent="start"
					color="gray.500"
					w="full"
					isTruncated
				>
					{
						// disable title change while opening the modal
						(!isOpen ? textareaValue : false) || "Write your answer"
					}
				</Button>
				<AddForm
					textareaValue={textareaValue}
					onChangeHandler={onChangeHandler}
					hasImageFeature
					isOpen={isOpen}
					onClose={onClose}
					onAddHandler={() => {
						dispatch(
							handleAddAnswer({
								content: textareaValue,
								question_id: question_id,
							})
						);
					}}
					onCancelHandler={onCancelHandler}
					user={user}
				/>
			</HStack>
		</>
	);
};

export default AnswerForm;
