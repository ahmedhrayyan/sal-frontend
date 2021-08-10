import {
  Text,
  Link,
  Heading,
  List,
  ListItem,
  ListIcon,
  Stack,
} from "@chakra-ui/react";
import { BsInfoCircleFill } from "react-icons/bs";

const QUEST_NOTES = [
  "Make sure your question has not been asked already.",
  "Keep your question short and to the point.",
  "Double-check grammar and spelling.",
];
const respSize = { base: "xs", md: "sm", lg: "md" };

export const QuestionNotes = () => (
  <Stack bg="gray.50" rounded="xl" p={[2, 4, 6]}>
    <Heading color="blue.500" as="h5" size="sm" fontSize={respSize}>
      Tips on getting good answers quickly
    </Heading>
    <List color="gray.500" px={2}>
      {QUEST_NOTES.map((note) => (
        <ListItem fontSize={respSize}>
          <ListIcon as={BsInfoCircleFill} color="blue.500" />
          {note}
        </ListItem>
      ))}
    </List>
  </Stack>
);

export const AnswerNotes = () => (
  <Text
    w="100%"
    rounded="xl"
    p="3"
    bg="gray.50"
    fontSize={respSize}
    alignSelf="start"
  >
    <Text as={"span"} color={"blue.500"} fontSize={respSize}>
      Note:
    </Text>{" "}
    You can use Marckdown to format text
    <Link ml="3vw" color="blue.500" href="#" fontSize={respSize}>
      Learn More?
    </Link>
  </Text>
);
