import { render, screen } from "@testing-library/react";
import { it, describe, expect, beforeEach } from "vitest";
import MovieList from "../components/MovieList/movieList";
import moviesData from "../movies.json";
import { BookmarkProvider } from "../context/BookmarkContext";
import { UserProvider } from "../context/UserContext";
import { MemoryRouter } from "react-router";

describe("MovieList", () => {
    beforeEach(() => {
        render(
            <UserProvider>
                <BookmarkProvider>
                    <MemoryRouter initialEntries={["/Netflix"]}>
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
            .map(movie => movie.thumbnail);

        // For each trending movie by imges
        trendingMovieImages.forEach(src => {
            const movieImgElement = document.querySelector(`img[src="${src}"]`);
            expect(movieImgElement).toBeInTheDocument();
        });
    });
});
//All tests are passed