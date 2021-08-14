import {
  Box,
  Button,
  HStack,
  Text,
  ButtonGroup,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import UserAvatar from "./userAvatar";
import AnswerView from "./answerView";
import AnswerForm from "./answerForm";
import { useState } from "react";

// TODO: Update props
interface QuestionViewProps {}
const respSize = { base: "xs", md: "sm" };
const QuestionView: FunctionComponent<QuestionViewProps> = () => {
  const [showAnswers, setShowAnswers] = useState(false);
  return (
    <Box
      w="full"
      bg={"whiteAlpha.900"}
      boxShadow={["sm", "md"]}
      rounded={["none", "xl"]}
      p="6"
      py="4"
      pb="2"
      fontSize={respSize}
    >
      <HStack mr="-4" mb="4">
        <UserAvatar
          name="Hossam Okasha"
          imgSrc="https://i.ibb.co/vYFBKQ4/11.jpg"
          title="software dev"
          hasTitle
        />
        <Spacer />
        <IconButton
          color="blue.500"
          variant="ghost"
          aria-label="Edit Question"
          icon={<BsThreeDotsVertical size="20" 
          onMouseDown={(e) => e.preventDefault()} // remove focus after click
          />}
        />
      </HStack>
      <Text mb="4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non
        tellus ac justo mattis mollis. Fusce nec erat at mi tristique gravida.
        Curabitur tempor dui ac ipsum vehicula feugiat. Fusce lacinia tellus vel
        rhoncus commodo. Vivamus efficitur odio ac finibus interdum. Praesent
        hendrerit libero vitae nulla sodales hendrerit.
      </Text>

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
              1k
            </Text>
          </Button>
          <Button
            onMouseDown={(e) => e.preventDefault()} // remove focus after click
            leftIcon={<BiDownvote size="20" />}
            pl="0"
            color="gray.600"
          >
            <Text mb="-1" as="span" ml="-1" fontSize={respSize}>
              3
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
          <AnswerForm />
          <AnswerView />
          <AnswerView />
        </>
      )}
    </Box>
  );
};

export default QuestionView;
