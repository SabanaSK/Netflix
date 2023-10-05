import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import CategoryList from "../components/CategoryList/CategoryList";
import moviesData from "./mockMovies.json";

describe("CategoryList", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CategoryList />
      </MemoryRouter>
    );
  });

  it("renders without errors", () => {
    const selectElement = screen.getByRole("combobox", {
      options: { hidden: true },
    });
    expect(selectElement).toBeInTheDocument();
  });

  it("displays default option", () => {
    const defaultOption = screen.getByText(/category/i);
    expect(defaultOption).toBeInTheDocument();
  });

  it("displays all genres", () => {
    const genres = moviesData.reduce((acc, movie) => {
      const genresForMovie = movie.genre.split(",").map((g) => g.trim());
      return [...new Set([...acc, ...genresForMovie])];
    }, []);
    genres.forEach((genre) => {
      const option = screen.getByText(new RegExp(genre, "i"));
      expect(option).toBeInTheDocument();
    });
  });
});
/*The last test verifies that all unique movie genres from the mock data are displayed in the CategoryList component. It extracts genres from the data, ensures there are no duplicates, and then checks that each genre is present in the rendered output.*/
