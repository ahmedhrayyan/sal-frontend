import { FunctionComponent } from "react";
import {
  Text,
  Stack,
  Avatar,
  HStack,
} from "@chakra-ui/react";

interface UserAvatarProps {
  imgSrc?: string;
  name: string;
  title?: string;
  hasTitle?: boolean;
}

const UserAvatar: FunctionComponent<UserAvatarProps> = ({
  hasTitle,
  name,
  title=" ",
  imgSrc=""
}) => {
  return (
    <HStack spacing={[2, 2, 3]}>
      <Avatar
        src={imgSrc}
        alt="User Avatar"
        name="Hossam Okasha"
        boxSize={[10, 14]}
      />
      <Stack spacing={-1} fontSize={{ base: "xs", md: "sm", lg: "md" }} pb="1">
        <Text fontWeight={600} fontSize="1em">
          {name}
        </Text>
        <Text color="gray.500" fontSize={hasTitle ? ".75em" : "1em"}>
          {hasTitle
            ? title
            : (`What's your question, ${name.split(" ")[0]}?`)}
        </Text>
      </Stack>
    </HStack>
  );
};

export default UserAvatar;