import { useRef, FC } from "react";
import {
	Button,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
} from "@chakra-ui/react";

interface DeleteAlertProps {
	onDeleteHandler(): void;
	onClose(): void;
	label: "Question" | "Answer";
	isOpen: boolean;
}
const DeleteAlert: FC<DeleteAlertProps> = ({
	isOpen,
	label,
	onClose,
	onDeleteHandler,
}) => {
	const cancelRef = useRef<HTMLButtonElement | null>(null);

	return (
		<>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
				isCentered
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete {label}
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure? You can't undo this action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose} bg="blue.500">
								Cancel
							</Button>
							<Button colorScheme="red" onClick={onDeleteHandler} ml={3}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};

export default DeleteAlert;
