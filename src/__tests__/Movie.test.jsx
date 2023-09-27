import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import Movie from "../components/Movie/Movie";
import moviesData from "../movies.json";
import { BookmarkProvider } from "../context/BookmarkContext";
import { UserProvider } from "../context/UserContext";
import { MemoryRouter } from "react-router";

describe("Movie", () => {
	it("should show year, rating and image", () => {
		const movieItem = moviesData[0];
		render(
			<UserProvider>
				<BookmarkProvider>
					<MemoryRouter initialEntries={["/Netflix"]}>
						<Movie movie={movieItem} />
					</MemoryRouter>
				</BookmarkProvider>
			</UserProvider>
		);
		const movieYear = screen.getByText("Year: 1994");
		const movieRating = screen.getByText("Rating: R");
		const movieImage = screen.getByAltText("The Shawshank Redemption");

		expect(movieYear).toBeInTheDocument();
		expect(movieRating).toBeInTheDocument();
		expect(movieImage).toBeInTheDocument();
	});

	it("should show correct image src", () => {
		const movieItem = moviesData[0];
		render(
			<UserProvider>
				<BookmarkProvider>
					<MemoryRouter initialEntries={["/Netflix"]}>
						<Movie movie={movieItem} />
					</MemoryRouter>
				</BookmarkProvider>
			</UserProvider>
		);

		const movieImage = screen.getByAltText("The Shawshank Redemption");

		expect(movieImage).toHaveAttribute(
			"src",
			"https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_QL75_UX380_CR0,4,380,562_.jpg"
		);
	});
});
