import { ComponentStyleConfig } from "@chakra-ui/react";

// ref: https://github.com/chakra-ui/chakra-ui/issues/2347

const Input: ComponentStyleConfig = {
	variants: {
		outline: {
			field: {
				borderRadius: "full",
			},
		},
	},
};

export default Input;
