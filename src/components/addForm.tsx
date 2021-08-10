import { FunctionComponent } from "react";
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
  isOpen: boolean;
  onClose: () => void;
  isQuestion?: boolean;
  hasImageFeature?: boolean;
}

const AddForm: FunctionComponent<AddFormProps> = ({
  isOpen,
  onClose,
  isQuestion,
  hasImageFeature,
}) => {
  const respSize = useBreakpointValue({ base: "xs", md: "sm", lg: "md" });
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
        <ModalHeader pb={[0, 0, 2]}>
          <UserAvatar name="Joe Doe" hasTitle title="Software Dev" />
        </ModalHeader>
        <ModalCloseButton color="blue.500" fontSize={respSize} />
        <ModalBody>
          <Stack pt={[2, 4, 6]} pb="4">
            <Textarea
              size={respSize}
              as={ResizeTextarea}
              maxHeight="70vh"
              resize="none"
              variant="flushed"
              placeholder={
                isQuestion
                  ? "What's your question, Hossam?"
                  : "Write Answer...."
              }
              pl="0"
              pt={[8, 4]}
              minHeight="10vh"
              autoFocus
              transition="height none" //required to enable autosize
            ></Textarea>

            <Flex w="100%">
              {hasImageFeature && (
                <HStack
                  color="blue.500"
                  spacing={[1, 2]}
                  as="label"
                  htmlFor="img-upload"
                  _hover={{ cursor: "pointer" }}
                >
                  <Icon as={BsCardImage} boxSize={[4, 6, 8]} pb={[0, 1]} />
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
                onClick={onClose}
                color="blue.500"
              >
                Cancel
              </Button>
              <Button
                bg={"messenger.500"}
                rounded={"full"}
                color={"white"}
                size={respSize}
                _hover={{ bg: "blue.500" }}
                _focus={{ bg: "blue.500" }}
              >
                Add {isQuestion ? "Qustion" : "Answer"}
              </Button>
            </Flex>
          </Stack>
        </ModalBody>
        <ModalFooter justifyContent={isQuestion ? "center" : "start"} pt="1">
          {isQuestion ? <QuestionNotes /> : <AnswerNotes />}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddForm;
