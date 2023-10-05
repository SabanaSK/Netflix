import { render, screen, within } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import { MoviePage } from "../pages/MoviePage/MoviePage";
import { MemoryRouter, Route, Routes } from "react-router";
import { BookmarkProvider } from "../context/BookmarkContext";

describe("MoviePage", () => {
	it("Should show correct title, year, synopsis and rating", async () => {
		render(
			<BookmarkProvider>
				<MemoryRouter initialEntries={["/movie/2"]}>
					<Routes>
						<Route path="/movie/:movieId" element={<MoviePage />} />
					</Routes>
				</MemoryRouter>
			</BookmarkProvider>
		);

		const movieTitle = screen.getByText("The Godfather");
		const movieYear = screen.getByText("1972", { exact: false });
		const movieRating = within(movieYear).getByText("R");
		const movieSynopsis = screen.getByText(
			"Don Vito Corleone, head of a mafia family,",
			{ exact: false }
		);

		expect(movieTitle).toBeInTheDocument();
		expect(movieYear).toBeInTheDocument();
		expect(movieRating).toBeInTheDocument();
		expect(movieSynopsis).toBeInTheDocument();
	});

	it("Should show 3 actors in a list", async () => {
		render(
			<BookmarkProvider>
				<MemoryRouter initialEntries={["/Netflix/movie/2"]}>
					<Routes>
						<Route path="/Netflix/movie/:movieId" element={<MoviePage />} />
					</Routes>
				</MemoryRouter>
			</BookmarkProvider>
		);

		const actorList = await screen.findAllByRole("listitem");
		const actor1 = within(actorList[0]).getByText("Marlon Brando");
		const actor2 = within(actorList[1]).getByText("Al Pacino");
		const actor3 = within(actorList[2]).getByText("James Caan");

		expect(actorList).toHaveLength(3);
		expect(actor1).toBeInTheDocument();
		expect(actor2).toBeInTheDocument();
		expect(actor3).toBeInTheDocument();
	});
});
