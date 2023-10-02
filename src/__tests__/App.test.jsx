import App from "../App";
import { it, describe, expect, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../context/UserContext";
import userEvent from "@testing-library/user-event";

//get mock data from mockMovies.json
vi.mock("../movies.json", async () => {
	const actual = await vi.importActual("./mockMovies.json");
	return actual;
});

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

describe("Bookmark features", () => {
	it("shows 3 correct movies on bookmark page after 3 bookmark icons are clicked on home page", async () => {
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

		const bookmarkIcons = screen.getAllByTestId("bookmark-icon");

		await user.click(bookmarkIcons[5]);
		await user.click(bookmarkIcons[3]);
		await user.click(bookmarkIcons[2]);

		const bookmarkLink = screen.getByRole("link", { name: "Bookmark" });
		expect(bookmarkLink).toHaveAttribute("href", "/Netflix/bookmark");

		await user.click(bookmarkLink);

		const movieAltText1 = screen.getByAltText(
			"Star Wars: Episode V - The Empire Strikes Back"
		);
		const movieAltText2 = screen.getByAltText("Casablanca");
		const movieAltText3 = screen.getByAltText("Psycho");

		expect(movieAltText1).toBeInTheDocument();
		expect(movieAltText2).toBeInTheDocument();
		expect(movieAltText3).toBeInTheDocument();
	});
});
