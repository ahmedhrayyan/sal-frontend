import { useState, FC } from "react";
import formImage from "../images/ask_form.jpg";
import logo from "../images/logo.svg";
import {
	Button,
	VStack,
	Flex,
	Text,
	Stack,
	Image,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
} from "@chakra-ui/react";
import { GoMarkGithub } from "react-icons/go";
import LoginFrom from "../components/loginForm";
import RegisterForm from "../components/registerForm";
import { Redirect, useLocation } from "react-router";
import { useAppSelector } from "../utils/hooks";

const Authentication: FC = () => {
	const { state } = useLocation<any>();
	const token = useAppSelector((state) => state.profile.token);

	const [tabIndex, setTabIndex] = useState(0);

	if (token !== null) {
		return <Redirect to={state?.from ? state.from : "/"} />;
	}

	return (
		<Stack
			direction="row"
			w="full"
			maxW={{ sm: "100vw", md: "80vw" }}
			mx={{ sm: "0", md: "10vw" }}
			h={["100vh", "100vh", "90vh"]}
			my={{ md: "5vh" }}
			rounded={{ md: "2em" }}
			bg="#EBFBFF"
			boxShadow={["lg", "2xl"]}
		>
			<Flex flex={1} justify={"center"} alignItems="center" p=".9em" w="full">
				<VStack
					spacing={tabIndex === 0 ? "4" : "2"}
					w={["100vw", "100vw", "full"]}
					maxW={{ md: "xs" }}
				>
					<Image
						src={logo}
						boxSize="6em"
						maxW="100px"
						mt="-6"
						filter="saturate(100%) brightness(0%)" // change color to black
					/>
					<Tabs
						onChange={(index) => setTabIndex(index)}
						variant="solid-rounded"
						w="100%"
						textAlign="center"
					>
						<TabList
							d="inline-flex"
							borderRadius="full"
							bgColor="white"
							boxShadow={["sm", "md"]}
						>
							<Tab>Sign In</Tab>
							<Tab>Sign Up</Tab>
						</TabList>
						<TabPanels mt="6">
							<TabPanel p="0">
								<LoginFrom />
							</TabPanel>
							<TabPanel p="0">
								<RegisterForm />
							</TabPanel>
						</TabPanels>
					</Tabs>
					<Flex
						maxW={["70%", "65%", "95%"]}
						w="full"
						align="center"
						_before={{
							content: '""',
							borderBottom: "1px solid",
							borderColor: "gray.300",
							flexGrow: 1,
							mr: 2,
						}}
						_after={{
							content: '""',
							borderBottom: "1px solid",
							borderColor: "gray.300",
							flexGrow: 1,
							ml: 2,
						}}
					>
						<Text color="gray.500" py={{ md: 2 }}>
							or
						</Text>
					</Flex>
					<Button
						variant="black"
						w={"full"}
						maxW={["70%", "65%", "95%"]}
						minHeight="10"
						leftIcon={<GoMarkGithub />}
						boxShadow={["sm", "md"]}
					>
						Sign {tabIndex === 0 ? "in" : "up"} with GitHub
					</Button>
				</VStack>
			</Flex>
			<Flex flex={1} justify="flex-end">
				<Image
					alt={"Login Image"}
					objectFit={"cover"}
					src={formImage}
					rounded={{ md: "2em" }}
					boxShadow={["none", "md", "lg"]}
					d={["none", "none", "inline-block"]}
				/>
			</Flex>
		</Stack>
	);
};

export default Authentication;
