import { ChakraProvider } from "@chakra-ui/react";
import { withPerformance } from "storybook-addon-performance"
import theme from "../src/theme";

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

const withChakra = (StoryFn) => {
	return (
		<ChakraProvider theme={theme}>
			<div id="story-wrapper">
				<StoryFn />
			</div>
		</ChakraProvider>
	);
};

export const decorators = [withChakra, withPerformance];