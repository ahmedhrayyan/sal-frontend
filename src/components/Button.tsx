import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";
import { FC } from "react";

const Button: FC<ButtonProps> = (props) => {
	return <ChakraButton {...props}></ChakraButton>
}

export default Button;
