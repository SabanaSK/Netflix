import App from "../App";
import { it, describe, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../context/UserContext";
import userEvent from "@testing-library/user-event";

const removeCookie = (name) => {
	document.cookie = `${name}=1; expires=1 Jan 1970 00:00:00 GMT;`;
};

describe("Login/logout features", () => {
	//Removes cookies to not contsminate tests
	afterEach(() => {
		removeCookie("user");
	});

	it("Should show Home Page when logged in", async () => {
		const user = userEvent.setup();

		render(
			<UserProvider>
				<MemoryRouter initialEntries={["/Netflix"]}>
					<App />
				</MemoryRouter>
			</UserProvider>
		);
		const usernameInput = screen.getByPlaceholderText("Username");
		await user.type(usernameInput, "admin");

		const passwordInput = screen.getByPlaceholderText("Password");
		await user.type(passwordInput, "password123");

		const loginButton = screen.getByRole("button", { name: "Login" });

		await user.click(loginButton);
		const homePageText = await screen.findByText("HomePage");

		expect(homePageText).toBeInTheDocument();
	});

	it("Should show Login Page after logout button is pressed", async () => {
		const user = userEvent.setup();

		render(
			<UserProvider>
				<MemoryRouter initialEntries={["/Netflix"]}>
					<App />
				</MemoryRouter>
			</UserProvider>
		);

		const usernameInput = screen.getByPlaceholderText("Username");
		await user.type(usernameInput, "admin");

		const passwordInput = screen.getByPlaceholderText("Password");
		await user.type(passwordInput, "password123");

		const loginButton = screen.getByRole("button", { name: "Login" });
		await user.click(loginButton);

		const logoutButton = screen.getByRole("button", { name: "Logout" });
		expect(logoutButton).toBeInTheDocument();

		await user.click(logoutButton);
		const loginPageText = await screen.findByText("Login Page");
		expect(loginPageText).toBeInTheDocument();
	});
});
