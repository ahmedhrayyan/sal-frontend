const path = require("path");

const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
	stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/preset-create-react-app",
		"storybook-addon-performance/register",
	],
	// essential to get emotion library work with storybook
	// ref: https://github.com/chakra-ui/chakra-ui/blob/main/.storybook/main.js
	webpackFinal: async (config) => {
		return {
			...config,
			resolve: {
				...config.resolve,
				alias: {
					...config.resolve.alias,
					"@emotion/core": toPath("node_modules/@emotion/react"),
					"emotion-theming": toPath("node_modules/@emotion/react"),
				},
			},
		};
	},
};