import MovieList from "../components/MovieList/movieList";
import { it, describe, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';

describe("MovieList", () => {
    const mockMovies = [
        {
            id: 1,
            thumbnail: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_QL75_UX380_CR0,4,380,562_.jpg",
            title: "The Shawshank Redemption",
            year: 1994,
            rating: "PG",
            isTrending: true,
        },
    ];
    
    beforeEach(() => {
        render(
            <MemoryRouter>
                <MovieList movies={mockMovies} />
            </MemoryRouter>
        );
    });

    it("renders the Trending and Recommended sections", () => {
        expect(screen.getByText("Trending")).toBeInTheDocument();
        expect(screen.getByText("Recommended for You")).toBeInTheDocument();
    });

    it("renders movies in Trending section", async () => {
        const movieElements = await screen.findByAltText("The Shawshank Redemption");
        expect(movieElements.length).toBeGreaterThan(0);
    });

    it("renders the details for the movie 'The Shawshank Redemption'", () => {
        const movieElement = screen.getByText("The Shawshank Redemption").closest('.movie-item');
        const { getByText } = within(movieElement);

        expect(getByText("The Shawshank Redemption")).toBeInTheDocument();
        expect(getByText("Year: 1994")).toBeInTheDocument();
        expect(getByText("Rating: PG")).toBeInTheDocument();
    });

});

