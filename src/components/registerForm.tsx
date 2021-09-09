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

const RegisterForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterData>();

	const onRegisterHandler: SubmitHandler<RegisterData> = (data) =>
		console.log(data);

	return (
		<VStack
			as="form"
			onSubmit={handleSubmit(onRegisterHandler)}
			spacing={[2]}
			w={"full"}
			maxW={"xs"}
		>
			<HStack align="flex-start">
				<FormControl isInvalid={!!errors.first_name}>
					<FormLabel srOnly>First name</FormLabel>
					<Input
						placeholder="First name"
						autoFocus
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

			<Button w="40" h="10" type="submit">
				Sign up
			</Button>
		</VStack>
	);
};

export default RegisterForm;
