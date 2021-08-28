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

enum Forms {
	"signIn",
	"signUp",
}

const Authentication: FC = () => {
	const [currentForm, setCurrentForm] = useState<Forms>(Forms.signIn);
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
					spacing={currentForm === Forms.signIn ? "4" : "2"}
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
							variant={currentForm === Forms.signIn ? "solid" : "white"}
							pr={currentForm === Forms.signIn ? "1em" : "2em"}
							boxShadow={["sm", "md"]}
							zIndex={currentForm === Forms.signIn ? "1" : "auto"}
							onClick={() => setCurrentForm(Forms.signIn)}
						>
							Sign In
						</Button>
						<Button
							variant={currentForm === Forms.signUp ? "solid" : "white"}
							pl={currentForm === Forms.signUp ? "1em" : "2em"}
							boxShadow={["sm", "md"]}
							onClick={() => setCurrentForm(Forms.signUp)}
						>
							Sign Up
						</Button>
					</ButtonGroup>
					{currentForm === Forms.signIn ? <LoginFrom /> : <RegisterForm />}
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
						Sign {currentForm === Forms.signIn ? "in" : "up"} with GitHub
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
