import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

// to remove focus for non-keyboard interactions
// ref: https://chakra-ui.com/docs/migration#css-reset
import "focus-visible/dist/focus-visible";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux";

// Import & configure dotenv package
require("dotenv").config();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<ChakraProvider theme={theme}>
					<App />
				</ChakraProvider>
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
