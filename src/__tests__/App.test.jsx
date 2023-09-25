import App from "../App";
import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../context/UserContext";
import userEvent from "@testing-library/user-event";

describe("Login/logout features", () => {
	it("Should show Login Page", () => {
		render(
			<UserProvider>
				<MemoryRouter initialEntries={["/Netflix"]}>
					<App />
				</MemoryRouter>
			</UserProvider>
		);

		expect(screen.getByText("Login Page")).toBeInTheDocument();
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
		expect(usernameInput).toBeInTheDocument();

		await user.type(usernameInput, "admin");

		const passwordInput = screen.getByPlaceholderText("Password");
		expect(passwordInput).toBeInTheDocument();

		await user.type(passwordInput, "password123");

		const loginButton = screen.getByRole("button", { name: "Login" });
		expect(loginButton).toBeInTheDocument();

		await user.click(loginButton);
		screen.debug();
		const homePageText = screen.findByText("HomePage");

		expect(homePageText).toBeInTheDocument();
	});
});
