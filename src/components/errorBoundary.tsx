import { Component } from "react";
import { Container, Heading, Text } from "@chakra-ui/react";

class ErrorBoundary extends Component {
	state = { hasError: false };

	static getDerivedStateFromError() {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error: any, errorInfo: any) {
		console.error('Error', error);
		console.error('Error Info', errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<Container py="5">
					<Heading color="red.400">Error:&nbsp;</Heading>
					<Text>
						Something went wrong, you can see a detailed information of what
						went wrong in browser <code>console</code> or try contacting the app
						administrator and give them a screenshot of that error
					</Text>
				</Container>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
