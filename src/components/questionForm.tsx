import { Box, useDisclosure } from "@chakra-ui/react";
import { FunctionComponent, FormEvent, useState } from "react";
import UserAvatar from "./userAvatar";
import AddForm from "./addForm";

interface QuestionProps {}

const QuestionForm: FunctionComponent = () => {
	const [textareaValue, setTextareaValue] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure(); // Modal

	const onChangeHandler = (e: FormEvent<HTMLTextAreaElement>): void => {
		setTextareaValue(e.currentTarget.value);
	};

	const onCancelHandler = () => {
		onClose();
		setTextareaValue("");
	};

	return (
		<Box
			w="full"
			bg={"whiteAlpha.900"}
			boxShadow={["sm", "md"]}
			rounded={["none", "xl"]}
			_hover={{ cursor: "pointer" }}
			onClick={onOpen}
			p="6"
			pt="4"
		>
			{/* TODO: pass props dynamically later */}
			<UserAvatar name="John Doe" title="Software Dev" />
			<AddForm
				textareaValue={textareaValue}
				onChangeHandler={onChangeHandler}
				isQuestion
				isOpen={isOpen}
				onClose={onClose}
				onAddHandler={() => {}}
				onCancelHandler={onCancelHandler}
			/>
		</Box>
	);
};

export default QuestionForm;
