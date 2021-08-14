import {
  Box,
  Button,
  HStack,
  Text,
  ButtonGroup,
  Spacer,
  IconButton,
  useBreakpointValue,
  Stack,
  Avatar,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

// Todo: Update props
interface AnswerViewProps {}
const respSize = { base: "xs", md: "sm" };
const AnswerView: FunctionComponent<AnswerViewProps> = () => {
  const respButton = useBreakpointValue([15, 20]);
  return (
    <HStack my="4" alignItems="start">
      <Avatar name="Ahmed Hamed" boxSize={[8, 9]} />
      <Box w="full">
        <Box bg="gray.50" p="3" rounded="xl">
          <HStack mr="-3" mb="1">
            <Stack spacing={0} fontSize=".85em">
              <Text fontWeight={600}>Ahmed Hamed</Text>
              <Text color="gray.500">Software Engineer</Text>
            </Stack>
            <Spacer />
            <IconButton
              color="blue.500"
              variant="ghost"
              aria-label="Edit Answer"
              size="sm"
              icon={<BsThreeDotsVertical size="16" />}
            />
          </HStack>
          <Text fontSize={respSize}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit donec
            consectetur semper nunc in molestie.
          </Text>
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
            >
              <Text mb="-1" as="span" ml="-1" fontSize={respSize}>
                9
              </Text>
            </Button>
            <Button
              leftIcon={<BiDownvote size={respButton} />}
              pl="0"
              color="gray.600"
              onMouseDown={(e) => e.preventDefault()} // remove focus after click
            >
              <Text mb="-1" as="span" ml="-1" fontSize={respSize}>
                3
              </Text>
            </Button>
          </ButtonGroup>
          <Text as="span" color="gray.500" fontSize={respSize}>
            2 hours ago
          </Text>
        </HStack>
      </Box>
    </HStack>
  );
};

export default AnswerView;
