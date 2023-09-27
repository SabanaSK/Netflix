import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import { BookmarkProvider } from "../context/BookmarkContext";
import BookmarkPage from "../pages/BookmarkPage";
import moviesData from "../movies.json";
import { MemoryRouter } from "react-router";

describe("Renders correctly", () => {
	it("shows 'no bookmarks saved yet'", () => {
		render(
			<BookmarkProvider>
				<BookmarkPage />
			</BookmarkProvider>
		);

		const noBookmarksText = screen.getByText("No bookmarks saved yet!");

		expect(noBookmarksText).toBeInTheDocument();
	});

	it("shows a movie image when movie is in bookmark", async () => {
		/* WHY DO I NEED MEMORYROUTER WHEN USING LOCALSTORAGE??? */

		const bookmarks = [moviesData[0]];

		window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

		expect(true).toBe(true);

		render(
			<BookmarkProvider>
				<MemoryRouter initialEntries={["/Netflix/bookmark"]}>
					<BookmarkPage />
				</MemoryRouter>
			</BookmarkProvider>
		);

		const movieImage = screen.getByAltText("The Shawshank Redemption");
		expect(movieImage).toBeInTheDocument();

		//clear to avoid test contamination
		window.localStorage.clear();
	});
});
