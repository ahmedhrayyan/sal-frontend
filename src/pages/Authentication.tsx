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
	ButtonGroup,
} from "@chakra-ui/react";

import { GoMarkGithub } from "react-icons/go";
import LoginFrom from "../components/loginForm";
import RegisterForm from "../components/registerForm";

const Authentication: FC = () => {
	const [currentForm, setCurrentForm] = useState("sign in");
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
					spacing={currentForm === "sign in" ? "4" : "2"}
					w={["100vw", "100vw", "full"]}
					maxW={{ md: "xs" }}
				>
					<Image
						src={logo}
						boxSize="6em"
						maxW="70px"
						mt="-6"
						filter="saturate(100%) brightness(0%)" // change color to black
					/>
					<ButtonGroup spacing="-7" pb="4">
						<Button
							variant={currentForm === "sign in" ? "solid" : "white"}
							pr={currentForm === "sign in" ? "1em" : "2em"}
							boxShadow={["sm", "md"]}
							zIndex={currentForm === "sign in" ? "1" : "auto"}
							onClick={() => setCurrentForm("sign in")}
						>
							Sign In
						</Button>
						<Button
							variant={currentForm === "sign up" ? "solid" : "white"}
							pl={currentForm === "sign up" ? "1em" : "2em"}
							boxShadow={["sm", "md"]}
							onClick={() => setCurrentForm("sign up")}
						>
							Sign Up
						</Button>
					</ButtonGroup>
					{currentForm === "sign in" ? <LoginFrom /> : <RegisterForm />}
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
					>
						Sign {currentForm === "sign in" ? "in" : "up"} with GitHub
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
