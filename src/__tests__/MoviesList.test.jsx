import { render, screen, within } from "@testing-library/react";
import { it, describe, expect, beforeEach, vi } from "vitest";
import MovieList from "../components/MovieList/movieList";
import moviesData from "./mockMovies.json";
import { BookmarkProvider } from "../context/BookmarkContext";
import { UserProvider } from "../context/UserContext";
import { MemoryRouter } from "react-router";

vi.mock(
	"../movies.json",
	async () => await vi.importActual("./mockMovies.json")
);

describe("MovieList", () => {
	beforeEach(() => {
		render(
			<UserProvider>
				<BookmarkProvider>
					<MemoryRouter initialEntries={["/"]}>
						<MovieList movies={moviesData} />
					</MemoryRouter>
				</BookmarkProvider>
			</UserProvider>
		);
	});

	it("renders the Trending and Recommended sections", () => {
		expect(
			screen.getByRole("heading", { name: /trending/i })
		).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: /recommended for you/i })
		).toBeInTheDocument();
	});

	it("renders Recommended movie", () => {
		const recommendedMovieTitles = moviesData
			.filter((movie) => !movie.isTrending)
			.map((movie) => movie.title);

		recommendedMovieTitles.forEach((movieTitle) => {
			const movieImgElement = screen.getByAltText(movieTitle);
			expect(movieImgElement).toBeInTheDocument();
		});
	});

	it("renders Trending movies", () => {
		const trendingMovieImages = moviesData
			.filter((movie) => movie.isTrending)
			.map((movie) => movie.title);

		trendingMovieImages.forEach((movie) => {
			const movieImgElement = screen.getByAltText(movie);

			expect(movieImgElement).toBeInTheDocument();
		});
	});

	it("renders the correct number of movies in the Recommended section", () => {
		const recommended = screen.getByTestId("recommended");
		const movieThumbnail = within(recommended).getAllByRole("img");
		expect(movieThumbnail).toHaveLength(6);
	});

	it("renders the correct number of movies in the Trending section", () => {
		const treading = screen.getByTestId("trending");
		const movieThumbnail = within(treading).getAllByRole("img");
		expect(movieThumbnail).toHaveLength(6);
	});
});
