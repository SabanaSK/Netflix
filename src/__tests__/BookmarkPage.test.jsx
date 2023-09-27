import { render, screen, within } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import { MoviePage } from "../pages/MoviePage/MoviePage";
import { MemoryRouter, Route, Routes } from "react-router";
import { BookmarkProvider } from "../context/BookmarkContext";
import BookmarkPage from "../pages/BookmarkPage";

describe("Renders correctly", () => {
	it.only("shows 'no bookmarks saved yet'", () => {
		render(
			<BookmarkProvider>
				<BookmarkPage />
			</BookmarkProvider>
		);

		const noBookmarksText = screen.getByText("No bookmarks saved yet!");

		expect(noBookmarksText).toBeInTheDocument();
	});
});
