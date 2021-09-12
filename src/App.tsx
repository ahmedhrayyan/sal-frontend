import { Flex } from "@chakra-ui/layout";
import { useEffect } from "react";
import { Route } from "react-router";
import Header from "./components/header";
import LoadingLogo from "./components/loadingLogo";
import Home from "./pages/Home";
import { handleShowProfile, selectProfile } from "./redux/slices/profileSlice";
import { useAppDispatch, useShallowEqSelector } from "./utils/hooks";

function App() {
	const dispatch = useAppDispatch();
	const profile = useShallowEqSelector(selectProfile);

	// mount logic
	useEffect(() => {
		dispatch(handleShowProfile());
	}, []); // eslint-disable-line

	if (!profile) {
		return (
			<Flex w="100vw" h="100vh" align="center" justify="center">
				<LoadingLogo />
			</Flex>
		);
	}

	return (
		<div className="app">
			<Header mb="10" profile={profile as Profile} />
			<Route path="/" exact={true}>
				<Home />
			</Route>
		</div>
	);
}

export default App;
