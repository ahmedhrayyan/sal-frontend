import { FunctionComponent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, VStack, FormControl, Input } from "@chakra-ui/react";

type Inputs = {
	email: string;
	password: string;
};

const LoginForm: FunctionComponent = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onLoginHandler: SubmitHandler<Inputs> = (data) => console.log(data);

	return (
		<VStack
			as="form"
			w="full"
			maxW={["90%", "70%", "100%"]}
			spacing="2"
			onSubmit={handleSubmit(onLoginHandler)}
		>
			{/** !! = boolean */}
			<FormControl isInvalid={!!errors.email}>
				<Input
					type="email"
					autoFocus
					placeholder="Email"
					{...register("email", { required: "This is required" })}
				/>
			</FormControl>
			<FormControl isInvalid={!!errors.password}>
				<Input
					type="password"
					placeholder="Password"
					{...register("password", {
						required: "This is required",
					})}
				/>
			</FormControl>
			<Button w="40" h="10" type="submit">
				Sign in
			</Button>
		</VStack>
	);
};

export default LoginForm;
