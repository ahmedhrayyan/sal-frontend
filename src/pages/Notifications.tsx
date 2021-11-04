import { FC, useEffect } from "react";
import { Container, Heading, Box, VStack } from "@chakra-ui/react";
import { useAppSelector } from "../utils/hooks";
import { selectNotifications } from "../redux/slices/notificationsSlice";
import Notification from "../components/notification";

const Notifications: FC = () => {
	const all = useAppSelector(selectNotifications);
	return (
		<Box as="main" mt="20">
			<Container maxW="container.sm" py="5">
				<Heading as="h1" size="md" mb="4">
					Notifications
				</Heading>
				<VStack spacing="2">
					{all.map((item) => (
						<Notification key={item.id} data={item} />
					))}
				</VStack>
			</Container>
		</Box>
	);
};

export default Notifications;
