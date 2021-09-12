import { Route } from "react-router";
import PrivateRoute from "./components/privateRoute";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";

function App() {
	return (
		<div className="app">
			<Route path="/authentication">
				<Authentication />
			</Route>
			<PrivateRoute path="/" exact={true}>
				<Home />
			</PrivateRoute>
		</div>
	);
}

export default App;
