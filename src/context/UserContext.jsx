import { createContext } from "react";
import { useCookies } from "react-cookie";
import PropTypes from "prop-types";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);

	const logoutUser = () => {
		removeCookie("user", { path: "/" });
	};

	const loginUser = (data) => {
		setCookie("user", data.user, { path: "/" });
	};

	const value = {
		logoutUser,
		loginUser,
		cookies,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
