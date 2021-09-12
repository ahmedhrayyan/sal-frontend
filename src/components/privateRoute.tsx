import { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAppSelector } from "../utils/hooks";

const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) => {
	const token = useAppSelector((state) => state.profile.token);
	if (token === null) {
		return (
			<Redirect
				to={{
					pathname: "/authentication",
					state: { from: window.location.pathname },
				}}
			/>
		);
	}
	return <Route {...rest}>{children}</Route>;
};

export default PrivateRoute;
