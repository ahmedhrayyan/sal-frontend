import { FC } from "react";
import { Text, Stack, Avatar, HStack } from "@chakra-ui/react";

interface UserAvatarProps {
  imgSrc?: string;
  name: string;
  title: string;
}

const UserAvatar: FC<UserAvatarProps> = ({
  name,
  title = " ",
  imgSrc = "",
}) => {
  return (
    <HStack spacing="2">
      <Avatar src={imgSrc} alt="User Avatar" name={name} boxSize="10" />
      <Stack spacing={-1} fontSize={["xs", "sm"]}>
        <Text fontWeight={600}>{name}</Text>
        <Text color="gray.500" isTruncated maxWidth={["60vw", "35vw"]} >
          {title}
        </Text>
      </Stack>
    </HStack>
  );
};

export default UserAvatar;
