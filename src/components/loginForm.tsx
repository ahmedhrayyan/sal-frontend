import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
	Button,
	VStack,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
} from "@chakra-ui/react";
import { validationMsgs } from "../data";

const LoginForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginData>();

	const onLoginHandler: SubmitHandler<LoginData> = (data) => console.log(data);

	return (
		<VStack
			as="form"
			w="full"
			maxW={["90%", "70%", "100%"]}
			spacing="2"
			onSubmit={handleSubmit(onLoginHandler)}
		>
			<FormControl isInvalid={!!errors.username}>
				<FormLabel srOnly>Username</FormLabel>
				<Input
					autoFocus
					placeholder="Username"
					{...register("username", { required: validationMsgs["required"] })}
				/>
				<FormErrorMessage>{errors.username?.message}</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={!!errors.password}>
				<FormLabel srOnly>Password</FormLabel>
				<Input
					type="password"
					placeholder="Password"
					{...register("password", {
						required: validationMsgs["required"],
						minLength: {
							value: 8,
							message: validationMsgs["shortPw"],
						},
					})}
				/>
				<FormErrorMessage>{errors.password?.message}</FormErrorMessage>
			</FormControl>
			<Button w="40" h="10" type="submit">
				Sign in
			</Button>
		</VStack>
	);
};

export default LoginForm;
