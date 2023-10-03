import { useState, useRef, useContext } from "react";
import styles from "./LoginPage.module.css";
import { UserContext } from "../../context/UserContext";
import mockUsers from "../../mockUsers.json";

/**
 * - render 2 text input
 * - check if both password and username is present in mockUsers
 * - loginUser from UserContext
 */

export const LoginPage = () => {
	const { loginUser } = useContext(UserContext);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const usernameRef = useRef(null);
	const passwordRef = useRef(null);

	const resetForm = () => {
		setUsername("");
		setPassword("");
	};

	const handleLogin = () => {
		setError("");

		if (!username || !password) {
			setError("Both fields are required!");
			return;
		}

		if (password.length <= 5) {
			setError("Password should be more than 5 characters!");
			return;
		}

		// Find user in mock data
		const user = mockUsers.find(
			(user) => user.username === username && user.password === password
		);

		if (user) {
			loginUser({ user: user.username });
			setError("");
			resetForm();
		} else {
			setError("Invalid credentials.");
			console.log("Setting Invalid credentials error"); // Debug log
		}
	};

	return (
		<div className={styles["login-page"]}>
			<h1 className={styles["login-page-title"]}>Login Page</h1>
			<div className={styles["login-page-container"]}>
				{error && <p className={styles["error-message"]}>{error}</p>}
				<input
					className={styles["login-page-input"]}
					ref={usernameRef}
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
				/>
				<input
					className={styles["login-page-input"]}
					ref={passwordRef}
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<button className={styles["login-page-button"]} onClick={handleLogin}>
					Login
				</button>
			</div>
		</div>
	);
};

export default LoginPage;
