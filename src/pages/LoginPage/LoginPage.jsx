import { useState, useRef } from "react";
import styles from "./LoginPage.module.css";

export const LoginPage = ({ setCookie }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const usernameRef = useRef(null);
	const passwordRef = useRef(null);

	const handleLogin = async () => {
		setError("");
		if (!username || !password) {
			setError("Both fields are requried!");
			return;
		}
		if (password.length <= 5) {
			setError("Password should be more than 5 characters!");
			return;
		}
		try {
			const response = await fetch("/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();

			console.log("DATA", data);

			if (response.ok) {
				setCookie("user", data.user, { path: "/" });
				setError("");
				resetForm();
				// You can handle JWT or other response data here if needed.
			} else {
				setError(data.errorMessage || "An error occurred.");
			}
		} catch (err) {
			setError("An error occurred while logging in.");
		}
	};

	const resetForm = () => {
		setUsername("");
		setPassword("");
		usernameRef.current.focus();
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
