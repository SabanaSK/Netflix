import { render, screen } from "@testing-library/react";
import { it, describe, expect, beforeEach, vi } from "vitest";
import MovieList from "../components/MovieList/movieList";
import moviesData from "./mockMovies.json"
import { BookmarkProvider } from "../context/BookmarkContext";
import { UserProvider } from "../context/UserContext";
import { MemoryRouter } from "react-router";

vi.mock("../movies.json", async () => {
	const actual = await vi.importActual("./mockMovies.json");
	return actual;
});

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
        expect(screen.getByRole("heading", { name: /trending/i })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /recommended for you/i })).toBeInTheDocument();
    });

    it("renders movies in the Recommended section by image source", () => {
        const godfatherImageSrc = "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_QL75_UX380_CR0,4,380,562_.jpg";
        const godfatherImgElement = document.querySelector(`img[src="${godfatherImageSrc}"]`);
        expect(godfatherImgElement).toBeInTheDocument();

        
    });

    it("renders movies in the Trending section by image source", () => {
        // Filter out movies that are trending
        const trendingMovieImages = moviesData
            .filter(movie => movie.isTrending)
            .map(movie => movie.title);
        console.log(trendingMovieImages);
        // For each trending movie by imges
        trendingMovieImages.forEach(movie => {
            const movieImgElement = screen.getByAltText(movie);
            
            expect(movieImgElement).toBeInTheDocument();
        });
    
});

    });
