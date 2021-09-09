import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import {
	Button,
	VStack,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	HStack,
} from "@chakra-ui/react";
import { validationMsgs } from "../data";
import { emailRegExp } from "../utils/helpers";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { handleRegister } from "../redux/slices/profileSlice";

const RegisterForm: FC = () => {
	const status = useAppSelector(state => state.profile.status);
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterData>();

	const onRegisterHandler: SubmitHandler<RegisterData> = (data) => {
		dispatch(handleRegister(data));
	}

	return (
		<VStack
			as="form"
			onSubmit={handleSubmit(onRegisterHandler)}
			spacing="2.5"
			w={"full"}
			maxW={["90%", "70%", "100%"]}
			mx="auto"
		>
			<HStack align="flex-start">
				<FormControl isInvalid={!!errors.first_name}>
					<FormLabel srOnly>First name</FormLabel>
					<Input
						placeholder="First name"
						{...register("first_name", {
							required: validationMsgs["required"],
						})}
					/>
					<FormErrorMessage>{errors.first_name?.message}</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!errors.last_name}>
					<FormLabel srOnly>Last name</FormLabel>
					<Input
						placeholder="Last name"
						{...register("last_name", {
							required: validationMsgs["required"],
						})}
					/>
					<FormErrorMessage>{errors.last_name?.message}</FormErrorMessage>
				</FormControl>
			</HStack>
			<FormControl isInvalid={!!errors.email}>
				<FormLabel srOnly>Email</FormLabel>
				<Input
					type="email"
					placeholder="Email"
					{...register("email", {
						required: validationMsgs["required"],
						pattern: {
							value: emailRegExp,
							message: validationMsgs["invalidEmail"],
						},
					})}
				/>
				<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={!!errors.username}>
				<FormLabel srOnly>Username</FormLabel>
				<Input
					placeholder="Username"
					{...register("username", { required: validationMsgs["required"] })}
				/>
				<FormErrorMessage>{errors.username?.message}</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={!!errors.password} mb="4">
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
				Sign up
			</Button>
		</VStack>
	);
};

export default RegisterForm;
