import { FC } from "react";
import { LinkBox, LinkOverlay, Text, Circle } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../utils/hooks";
import { handleMarkNotificationRead } from "../redux/slices/notificationsSlice";
import { timeSince } from "../utils/date";

type Props = { data: APINotification };
const Notification: FC<Props> = ({ data }) => {
	const dispatch = useAppDispatch();
	function handleMarkRead() {
		dispatch(handleMarkNotificationRead(data));
	}
	return (
		<LinkBox
			w="full"
			py="4"
			ps="5"
			pe="8"
			pos="relative"
			borderWidth="1px"
			rounded="lg"
			bgColor="white"
			onClick={handleMarkRead}
		>
			<Text size="md" mb="1" color={data.is_read ? "gray.600" : "inherit"}>
				<LinkOverlay
					as={Link}
					to={data.url}
					_hover={{ textDecor: "underline" }}
				>
					{data.content}
				</LinkOverlay>
			</Text>
			<Text fontSize="sm" color={data.is_read ? "gray.500" : "blue.500"}>
				<time>{timeSince(data.created_at)} ago</time>
			</Text>
			<Circle
				d={data.is_read ? "none" : "initial"}
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
