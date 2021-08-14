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
    <HStack spacing="2" >
      <Avatar
        src={imgSrc}
        alt="User Avatar"
        name={name}
        boxSize="10"
      />
      <Stack spacing={-1} fontSize={["xs", "sm"]} >
        <Text fontWeight={600} >
          {name}
        </Text>
        <Text color="gray.500" >
          {hasTitle
            ? title
            : (`What's your question, ${name.split(" ")[0]}?`)}
        </Text>
      </Stack>
    </HStack>
  );
};

export default UserAvatar;