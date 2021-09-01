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
import { FunctionComponent } from "react";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatKNumbers, formatTimeAgo } from "../helpers/index";

interface AnswerViewProps {
  answer: any; // update later
  currentUser: any;
  authToken: string;
}
const respSize = { base: "xs", md: "sm" };
const AnswerView: FunctionComponent<AnswerViewProps> = ({
  answer,
  currentUser,
  authToken,
}) => {
  const respButton = useBreakpointValue([15, 20]);
  const isTheCurrentUser = answer.user.id === currentUser.id;
  return (
    <HStack my="4" alignItems="start">
      <Avatar name={answer.user.full_name} boxSize={[8, 9]} />
      <Box w="full">
        <Box bg="gray.50" p="3" rounded="xl">
          <HStack mr="-3" mb="1">
            <Stack spacing={0} fontSize=".85em">
              <Text
                fontWeight={600}
              >{answer.user.full_name}</Text>
              <Text color="gray.500">{answer.user.job}</Text>
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
                    <MenuItem>Edit answer</MenuItem>
                    <MenuItem>Delete answer</MenuItem>
                  </>
                )}
                {isTheCurrentUser || <MenuItem>Report answer</MenuItem>}
              </MenuList>
            </Menu>
          </HStack>
          <Box mb="4" dangerouslySetInnerHTML={{ __html: answer.content }} />
        </Box>
        <HStack color="blue.500" spacing={[2, 4]} mt="4px">
          <ButtonGroup
            size="xs"
            variant="ghost"
            rounded={["none", "xl"]}
            isAttached
          >
            <Button leftIcon={<BiUpvote size={respButton} />} mr="-px" pl="2">
              <Text mb="-1" as="span" ml="-1" fontSize={respSize}>
                {formatKNumbers(answer.upVotes)}
              </Text>
            </Button>
            <Button
              leftIcon={<BiDownvote size={respButton} />}
              pl="0"
              color="gray.600"
            >
              <Text mb="-1" as="span" ml="-1" fontSize={respSize}>
                {formatKNumbers(answer.downVotes)}
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
