import { Text, Heading, VStack } from "@chakra-ui/layout";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Icon from "@chakra-ui/icon";
import { FC } from "react";

interface QuestionViewProps {
	heading: string;
	text: string;
}
const NoResult: FC<QuestionViewProps> = ({ heading, text }) => {
	return (
		<VStack pt="100px" textAlign="center">
			<Icon
				as={AiOutlineCloseCircle}
				h="80%"
				fontSize={["70px", "90px"]}
				color="gray.500"
			/>
			<Heading
				as="h3"
				fontSize={["20px", "25px"]}
				mt="8"
				color="gray.500"
				pt="20px"
			>
				{heading}
			</Heading>
			<Text fontSize={["14px", "16px"]} color="gray.500">
				{text}
			</Text>
		</VStack>
	);
};

export default NoResult;
