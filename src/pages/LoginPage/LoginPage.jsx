import { useState, useRef, useContext } from "react";
import styles from "./LoginPage.module.css";
import { UserContext } from "../../context/UserContext";
import mockUsers from "../../mockUsers.json";

export const LoginPage = () => {
	const { loginUser } = useContext(UserContext);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const usernameRef = useRef(null);
	const passwordRef = useRef(null);

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

	const resetForm = () => {
		setUsername("");
		setPassword("");
	};

	return (
		<div>
			<h1>Login Page</h1>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<input
				ref={usernameRef}
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
			/>
			<input
				ref={passwordRef}
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
			/>
			<button className={styles.button} onClick={handleLogin}>
				Login
			</button>
		</div>
	);
};

export default LoginPage;
