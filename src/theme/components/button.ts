import { ComponentStyleConfig } from "@chakra-ui/react";

const Button: ComponentStyleConfig = {
  baseStyle: {
    rounded: "full",
  },
  defaultProps: {
    colorScheme: "blue",
  },
  variants: {
    black: {
      color: "white",
      bg: "black",
      "&: hover": { bg: "rgba(0, 0, 0, .95)" },
    },
    white: {
      color: "blue.500",
      bg: "white",
      "&: hover": { bg: "gray.50" },
    },
  },
};

export default Button;
