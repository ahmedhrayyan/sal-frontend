import { Text, Heading, VStack } from "@chakra-ui/layout";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Icon from "@chakra-ui/icon";

const NoResult = () => {
	return (
		<VStack pt="100px">
			<Icon as={AiOutlineCloseCircle} h="80%" fontSize={["70px" ,"90px"]} color="blue.500"/>
			<Heading as="h3" fontSize={["20px" ,"25px"]} mt="8" color="blue.500" pt="20px">
				No results found
			</Heading>
			<Text fontSize={["14px" ,"16px"]} color="gray.500">
				Please check spelling or try different keywords.
			</Text>
		</VStack>
	);
};

export default NoResult;
