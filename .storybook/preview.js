import { ChakraProvider } from "@chakra-ui/react";
import { withPerformance } from "storybook-addon-performance";
import theme from "../src/theme";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { MemoryRouter } from "react-router";
// to remove focus for non-keyboard interactions
// ref: https://chakra-ui.com/docs/migration#css-reset
import "focus-visible/dist/focus-visible";
import { Provider } from "react-redux";
import store from "../src/redux";

export const parameters = {
	viewport: {
		viewports: INITIAL_VIEWPORTS,
	},
	// remove storybook <body></body> padding
	layout: "fullscreen",
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

// To be able to use react router elements in stories
// ref: https://github.com/storybookjs/storybook/issues/769#issuecomment-294082103
const withRouter = (StoryFn) => (
	<MemoryRouter>
		<StoryFn />
	</MemoryRouter>
);

const withProvider = (StoryFn) => (
	<Provider store={store}>
		<StoryFn />
	</Provider>
)

export const decorators = [withProvider, withRouter,  withChakra, withPerformance];
