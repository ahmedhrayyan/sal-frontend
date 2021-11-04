import { FC, useEffect } from "react";
import { Container, Heading, Box, VStack } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import {
	handleLoadNotifications,
	selectNotifications,
} from "../redux/slices/notificationsSlice";
import Notification from "../components/notification";

const Notifications: FC = () => {
	const dispatch = useAppDispatch();
	const all = useAppSelector(selectNotifications);
	// mount logic
	useEffect(() => {
		dispatch(handleLoadNotifications(1));
	}, []); // eslint-disable-line

	return (
		<Box as="main" mt="20">
			<Container maxW="container.sm" py="5">
				<Heading as="h1" size="md" mb="4">
					Notifications
				</Heading>
				<VStack spacing="3">
					{all.map((item) => (
						<Notification key={item.id} data={item} isRead={item.is_read} />
					))}
				</VStack>
			</Container>
		</Box>
	);
};

export default Notifications;
