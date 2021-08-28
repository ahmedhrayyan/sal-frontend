import { useEffect, FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button, VStack, FormControl, Input, HStack } from "@chakra-ui/react";

type Inputs = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	jobTitle: string;
};

const RegisterForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful },
		reset,
	} = useForm<Inputs>();

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	}, [reset, isSubmitSuccessful]);

	const onRegisterHandler: SubmitHandler<Inputs> = (data) => console.log(data);

	return (
		<VStack
			as="form"
			onSubmit={handleSubmit(onRegisterHandler)}
			spacing={[2]}
			w={"full"}
			maxW={"xs"}
		>
			<HStack>
				{/** !! = boolean */}
				<FormControl isInvalid={!!errors.firstName}>
					<Input
						type="text"
						placeholder="First name"
						autoFocus
						{...register("firstName", {
							required: "This is required",
						})}
					/>
				</FormControl>
				<FormControl isInvalid={!!errors.lastName}>
					<Input
						type="text"
						placeholder="Last name"
						{...register("lastName", {
							required: "This is required",
						})}
					/>
				</FormControl>
			</HStack>
			<FormControl isInvalid={!!errors.email}>
				<Input
					type="email"
					placeholder="Email"
					{...register("email", { required: "This is required" })}
				/>
			</FormControl>
			<FormControl isInvalid={!!errors.jobTitle}>
				<Input
					type="text"
					placeholder="Job title"
					{...register("jobTitle", { required: "This is required" })}
				/>
			</FormControl>
			<FormControl isInvalid={!!errors.password}>
				<Input
					mb="4"
					type="password"
					placeholder="Password"
					{...register("password", {
						required: "This is required",
						minLength: {
							value: 8,
							message: "Password requires 6 characters minimum",
						},
					})}
				/>
			</FormControl>

			<Button w="40" h="10" type="submit">
				Sign up
			</Button>
		</VStack>
	);
};

export default RegisterForm;
