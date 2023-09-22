// src/mocks/handlers.js
// src/mocks/handlers.js
import { rest } from "msw";
import mockUsers from "./mockUsers.json";

export const handlers = [
	rest.post("/login", (req, res, ctx) => {
		const { username, password } = req.body;

		const maybeUser = mockUsers.find((user) => user.username === username);

		// Check if the provided username and password are correct
		if (maybeUser) {
			if (maybeUser.password === password) {
				// If the credentials are correct, persist user's authentication in the session
				sessionStorage.setItem("is-authenticated", "true");
				return res(
					ctx.status(200),
					ctx.json({
						user: username,
					})
				);
			}
		} else {
			// If the credentials are incorrect, return a 401 Unauthorized error
			return res(
				ctx.status(401),
				ctx.json({
					errorMessage: "Invalid credentials",
				})
			);
		}
	}),

	rest.get("/user", (req, res, ctx) => {
		// Check if the user is authenticated in this session
		const isAuthenticated = sessionStorage.getItem("is-authenticated");

		if (!isAuthenticated) {
			// If not authenticated, respond with a 403 error
			return res(
				ctx.status(403),
				ctx.json({
					errorMessage: "Not authorized",
				})
			);
		}

		// If authenticated, return mocked user details
		return res(
			ctx.status(200),
			ctx.json({
				username: "admin",
			})
		);
	}),
];
