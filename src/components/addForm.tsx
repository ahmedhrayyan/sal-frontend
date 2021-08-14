import { FunctionComponent, FormEvent } from "react";
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
import ResizeTextarea from "react-textarea-autosize";
import { BsCardImage } from "react-icons/bs";
import UserAvatar from "./userAvatar";
import { AnswerNotes, QuestionNotes } from "./notes";

interface AddFormProps {
  isQuestion?: boolean;
  hasImageFeature?: boolean;
  isOpen: boolean;
  textareaValue: string;
  onChangeHandler(e: FormEvent<HTMLTextAreaElement>): void;
  onAddHandler(): void;
  onClose(): void;
  onCancelHandler(): void;
}

const AddForm: FunctionComponent<AddFormProps> = ({
  isQuestion,
  hasImageFeature,
  isOpen,
  textareaValue,
  onChangeHandler,
  onAddHandler,
  onClose,
  onCancelHandler,
}) => {
	const respSize = useBreakpointValue({ base: "xs", md: "sm" });
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered
			size="xl"
			scrollBehavior="inside"
			useInert={false} //hide all except modal for screen readers
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader pb="0">
					{/*update to dynamic later*/}
					<UserAvatar name="Joe Doe" hasTitle title="Software Dev" />{" "}
				</ModalHeader>
				<ModalCloseButton color="blue.500" fontSize={respSize} />
				<ModalBody>
					<Stack pt={[2, 4, 6]} pb="4">
						<Textarea
							value={textareaValue}
              size={respSize}
              as={ResizeTextarea}
              minHeight="5vh"
              maxHeight="70vh"
              mb="4"
              pt={[4, 8]}
              resize="none"
              variant="flushed"
              placeholder={
                isQuestion
                ? "What's your question, Hossam?"
                : "Write Answer...."
              }
              transition="height none" //required to enable autosize
              autoFocus
              onChange={onChangeHandler}
						></Textarea>

						<Flex w="100%">
							{hasImageFeature && (
								<HStack
									color="blue.500"
									spacing="1"
									as="label"
									htmlFor="img-upload"
									_hover={{ cursor: "pointer" }}
								>
									<Icon as={BsCardImage} boxSize={[4, 6]} pb="0"  />
									<Text color="inherit" fontSize={respSize} variant="link">
										Add Image
									</Text>
									<Input
										id="img-upload"
										d="none"
										type="file"
										accept="image/png, image/jpeg"
									/>
								</HStack>
							)}
							<Spacer />
							<Button
								size={respSize}
								variant="link"
								mr={[2, 4, 6]}
								color="blue.500"
								onClick={onCancelHandler}
							>
								Cancel
							</Button>
							<Button
								bg={"blue.500"}
								rounded={"full"}
								color={"white"}
								size={respSize}
								_hover={{ bg: "blue.600" }}
								_focus={{ bg: "blue.600" }}
                onAdd={onAddHandler}
							>
								Add {isQuestion ? "Qustion" : "Answer"}
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
