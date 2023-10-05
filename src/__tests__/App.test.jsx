import App from "../App";
import { it, describe, expect, afterEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../context/UserContext";
import userEvent from "@testing-library/user-event";

//get mock data from mockMovies.json
vi.mock(
	"../movies.json",
	async () => await vi.importActual("./mockMovies.json")
);

const removeCookie = (name) => {
	document.cookie = `${name}=1; expires=1 Jan 1970 00:00:00 GMT;`;
};

//Removes cookies to not contaminate tests
afterEach(() => {
	removeCookie("user");
	window.localStorage.clear();
});

describe("Login/logout features", () => {
	it("Should show Home Page when logged in", async () => {
		const user = userEvent.setup();

		render(
			<UserProvider>
				<MemoryRouter initialEntries={["/"]}>
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
		const homePageText = await screen.findByText("Trending");

		expect(homePageText).toBeInTheDocument();
	});

	it("Should show Login Page after logout button is pressed", async () => {
		const user = userEvent.setup();

		render(
			<UserProvider>
				<MemoryRouter initialEntries={["/"]}>
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

		const logoutButton = screen.getAllByRole("button", { name: "Logout" });

		await user.click(logoutButton[0]);
		const usernameInput2 = screen.getByPlaceholderText("Username");
		expect(usernameInput2).toBeInTheDocument();
	});
});

describe("Bookmark features", () => {
	it("shows 3 correct movies on bookmark page after 3 bookmark icons are clicked from trending list", async () => {
		const user = userEvent.setup();
		const movieTitles = [];

		render(
			<UserProvider>
				<MemoryRouter initialEntries={["/"]}>
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

		const trending = screen.getByTestId("trending");

		const movieThumbnail = within(trending).getAllByTestId("movie-thumbnail");
		const movie = within(movieThumbnail[2]).getByRole("img");
		movieTitles.push(movie.alt);

		const bookmark = within(movieThumbnail[2]).getByTestId("bookmark-icon");
		await user.click(bookmark);

		const movie2 = within(movieThumbnail[5]).getByRole("img");
		movieTitles.push(movie2.alt);

		const bookmark2 = within(movieThumbnail[5]).getByTestId("bookmark-icon");
		await user.click(bookmark2);

		const movie3 = within(movieThumbnail[1]).getByRole("img");
		movieTitles.push(movie3.alt);

		const bookmark3 = within(movieThumbnail[1]).getByTestId("bookmark-icon");
		await user.click(bookmark3);
		const bookmarkLink = screen.getAllByRole("link", { name: "Bookmark" });
		expect(bookmarkLink[0]).toHaveAttribute("href", "/bookmark");

		await user.click(bookmarkLink[0]);

		const movieThumbnail2 = screen.getAllByTestId("movie-thumbnail");
		expect(movieThumbnail2).toHaveLength(3);

		const movieThumbnailAlts = movieThumbnail2.map((movie) => {
			const movieImg = within(movie).getByRole("img");
			return movieImg.alt;
		});

		movieTitles.forEach((title) => {
			expect(movieThumbnailAlts).toContain(title);
		});
	});

	it("shows 3 correct movies on bookmark page after 3 bookmark icons are clicked from recommended list", async () => {
		const user = userEvent.setup();
		const movieTitles = [];

		render(
			<UserProvider>
				<MemoryRouter initialEntries={["/"]}>
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

		const recommended = screen.getByTestId("recommended");

		const movieThumbnail =
			within(recommended).getAllByTestId("movie-thumbnail");
		const movie = within(movieThumbnail[2]).getByRole("img");
		movieTitles.push(movie.alt);

		const bookmark = within(movieThumbnail[2]).getByTestId("bookmark-icon");
		await user.click(bookmark);

		const movie2 = within(movieThumbnail[5]).getByRole("img");
		movieTitles.push(movie2.alt);

		const bookmark2 = within(movieThumbnail[5]).getByTestId("bookmark-icon");
		await user.click(bookmark2);

		const movie3 = within(movieThumbnail[1]).getByRole("img");
		movieTitles.push(movie3.alt);

		const bookmark3 = within(movieThumbnail[1]).getByTestId("bookmark-icon");
		await user.click(bookmark3);
		const bookmarkLink = screen.getAllByRole("link", { name: "Bookmark" });

		await user.click(bookmarkLink[0]);

		const movieThumbnail2 = screen.getAllByTestId("movie-thumbnail");
		expect(movieThumbnail2).toHaveLength(3);

		const movieThumbnailAlts = movieThumbnail2.map((movie) => {
			const movieImg = within(movie).getByRole("img");
			return movieImg.alt;
		});

		movieTitles.forEach((title) => {
			expect(movieThumbnailAlts).toContain(title);
		});
	});
});

describe("Search features", () => {
	it("shows correct number of movies when e, em, emp and empi is typed in searchbar, final movie is empire strikes back", async () => {
		const user = userEvent.setup();

		render(
			<UserProvider>
				<MemoryRouter initialEntries={["/"]}>
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

		const searchInput = screen.getByPlaceholderText("Search...");
		await user.type(searchInput, "e");

		const movieList = screen.getAllByTestId("movie-thumbnail");
		expect(movieList).toHaveLength(9);

		await user.type(searchInput, "m");

		const movieList2 = screen.getAllByTestId("movie-thumbnail");
		expect(movieList2).toHaveLength(2);

		await user.type(searchInput, "p");
		const movieList3 = screen.getAllByTestId("movie-thumbnail");
		expect(movieList3).toHaveLength(2);

		await user.type(searchInput, "i");
		const movieList4 = screen.getAllByTestId("movie-thumbnail");
		expect(movieList4).toHaveLength(1);

		const movieTitle = screen.getByAltText(
			"Star Wars: Episode V - The Empire Strikes Back"
		);
		expect(movieTitle).toBeInTheDocument();
	});
});
