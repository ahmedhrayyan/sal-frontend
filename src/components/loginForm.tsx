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
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { handleLogin } from "../redux/slices/profileSlice";

const LoginForm: FC = () => {
	const status = useAppSelector((state) => state.profile.status);
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginData>();

	const onLoginHandler: SubmitHandler<LoginData> = (data) => {
		dispatch(handleLogin(data));
	};

	return (
		<VStack
			as="form"
			w="full"
			maxW={["90%", "70%", "100%"]}
			mx="auto"
			spacing="2.5"
			onSubmit={handleSubmit(onLoginHandler)}
			sx={{
				input: {
					bg: "white !important",
					borderRadius: "20em !important",
					boxShadow: ["sm", "md"],
				},
				button: {
					boxShadow: ["sm", "md"],
				},
			}}
		>
			<FormControl isInvalid={!!errors.username}>
				<FormLabel srOnly>Username</FormLabel>
				<Input
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
			<Button w="40" h="10" type="submit" isLoading={status === "pending"}>
				Sign in
			</Button>
		</VStack>
	);
};

export default LoginForm;
