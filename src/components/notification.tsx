import { FC } from "react";
import { LinkBox, LinkOverlay, Text, Circle } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "../utils/helpers";

type Props = { data: Omit<APINotification, "is_read">; isRead?: boolean };
const Notification: FC<Props> = ({ data, isRead = false }) => {
	return (
		<LinkBox
			as="article"
			maxW="lg"
			py="3"
			ps="5"
			pe="8"
			pos="relative"
			borderWidth="1px"
			rounded="lg"
			bgColor="white"
		>
			<Text size="md" my="2" color={isRead ? "gray.500" : "inherit"}>
				<LinkOverlay
					as={Link}
					to={data.url}
					_hover={{ textDecor: "underline" }}
				>
					{data.content}
				</LinkOverlay>
			</Text>
			<Text
				textAlign="end"
				fontSize="sm"
				color={isRead ? "gray.400" : "blue.500"}
			>
				<time>{formatTimeAgo(new Date(data.created_at))}</time>
			</Text>
			<Circle
				d={isRead ? "none" : "initial"}
				size="3"
				pos="absolute"
				insetEnd="2"
				top="50%"
				mt="-1.5"
				bgColor="blue.400"
			/>
		</LinkBox>
	);
};

export default Notification;
