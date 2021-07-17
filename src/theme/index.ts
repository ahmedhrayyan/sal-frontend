// using chakra convention for customizing its theme
// ref: https://chakra-ui.com/docs/theming/customize-theme#scaling-out-your-project

import { extendTheme, ThemeOverride } from "@chakra-ui/react";
import Container from "./components/container";

const overrides: ThemeOverride = {
	direction: "ltr",
	components: {
		Container,
	},
};

export default extendTheme(overrides);
