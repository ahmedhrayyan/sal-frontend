// using chakra convention for customizing its theme
// ref: https://chakra-ui.com/docs/theming/customize-theme#scaling-out-your-project

import { extendTheme, ThemeOverride } from "@chakra-ui/react";
import Container from "./components/container";

const overrides: ThemeOverride = {
	direction: "ltr",
	colors: {
    gray: {
      50: "#F5F5F5", //bg color
    },
    blue: {
      500: "#0078D4", //primary
    },
  },
	components: {
		Container,
	},
};

export default extendTheme(overrides);
