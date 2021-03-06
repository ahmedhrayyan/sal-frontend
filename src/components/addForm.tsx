import { FC, FormEvent } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import {
	Stack,
	Button,
	Flex,
	Textarea,
	Modal,
	ModalOverlay,
	ModalBody,
	ModalContent,
	ModalCloseButton,
	ModalHeader,
	ModalFooter,
	Spacer,
	useBreakpointValue,
	Icon,
	Input,
	HStack,
	Text,
} from "@chakra-ui/react";
import { BsCardImage } from "react-icons/bs";
import UserAvatar from "./userAvatar";
import { AnswerNotes, QuestionNotes } from "./notes";
import AutoTextArea from "./textArea";

interface AddFormProps {
	user: any; // change later
	isQuestion?: boolean;
	isEditForm?: boolean; // for edit Q/A
	hasImageFeature?: boolean;
	isOpen: boolean;
	textareaValue: string;
	onChangeHandler(e: FormEvent<HTMLTextAreaElement>): void;
	onAddHandler(): any;
	onClose(): void;
	onCancelHandler(): void;
}

type Inputs = {
	textarea: string;
	image: any;
};

const AddForm: FC<AddFormProps> = ({
	user,
	isQuestion,
	hasImageFeature,
	isOpen,
	textareaValue,
	isEditForm,
	onChangeHandler,
	onAddHandler,
	onClose,
	onCancelHandler,
}) => {
	const respSize = useBreakpointValue({ base: "xs", md: "sm" });
	const { control, register, handleSubmit } = useForm<Inputs>();

	const onSubmitHandler: SubmitHandler<Inputs> = (data) => {
		onCancelHandler();
		onAddHandler();
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered
			size="xl"
			scrollBehavior="inside"
			useInert={false} // hide all except modal for screen readers
			motionPreset="slideInBottom"
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					<UserAvatar
						name={user.full_name}
						title={user.job}
						imgSrc={user.avatar}
					/>
				</ModalHeader>
				<ModalCloseButton color="blue.500" fontSize={respSize} />
				<ModalBody>
					<Stack as="form" onSubmit={handleSubmit(onSubmitHandler)}>
						<Controller
							name="textarea"
							control={control}
							render={({ field: { onChange } }) => (
								<Textarea
									placeholder={
										isQuestion
											? `What's your question, ${user.first_name}?`
											: "Write Answer...."
									}
									as={AutoTextArea}
									value={textareaValue}
									onChange={(e) => {
										onChangeHandler(e);
										onChange(textareaValue);
									}}
									variant="flushed"
									overflow="hidden"
									resize="none"
									minHeight="0"
									maxHeight="100vh"
									autoFocus
									fontSize={["xs", "md"]}
								/>
							)}
						/>

						<Flex w="100%">
							{hasImageFeature && (
								<HStack
									color="blue.500"
									spacing="1"
									as="label"
									htmlFor="img-upload"
									_hover={{ cursor: "pointer" }}
								>
									<Icon as={BsCardImage} boxSize={[4, 6]} pb="0" />
									<Text color="inherit" fontSize={respSize} variant="link">
										Add Image
									</Text>
									<Input
										id="img-upload"
										d="none"
										type="file"
										accept="image/png, image/jpeg"
										{...register("image")}
									/>
								</HStack>
							)}
							<Spacer />
							<Button
								size={respSize}
								variant="link"
								mr={[2, 4, 6]}
								onClick={onCancelHandler}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								size={respSize}
								disabled={textareaValue === ""}
							>
								{isEditForm ? "Save" : "Add"}{" "}
								{isQuestion ? "Question" : "Answer"}
							</Button>
						</Flex>
					</Stack>
				</ModalBody>
				<ModalFooter justifyContent={isQuestion ? "center" : "start"} pt="4">
					{isQuestion ? <QuestionNotes /> : <AnswerNotes />}
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AddForm;
