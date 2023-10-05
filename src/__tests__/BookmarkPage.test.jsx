import { render, screen } from "@testing-library/react";
import { it, describe, expect, afterEach } from "vitest";
import { BookmarkProvider } from "../context/BookmarkContext";
import BookmarkPage from "../pages/BookmarkPage/BookmarkPage";
import moviesData from "../movies.json";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";


afterEach(() => {
  window.localStorage.clear();  //clear to avoid test contamination
});

describe("Bookmarks features", () => {
  it("shows 'no bookmarks saved yet'", () => {
    render(
      <BookmarkProvider>
        <BookmarkPage />
      </BookmarkProvider>
    );

    const noBookmarksText = screen.getByText("No bookmarks saved yet!");
    expect(noBookmarksText).toBeInTheDocument();
  });

  it("shows a movie image with correct alt text when said movie is in bookmarks", async () => {
    const bookmarks = [moviesData[0]];

    window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    render(
      <BookmarkProvider>
        <MemoryRouter initialEntries={["/bookmark"]}>
          <BookmarkPage />
        </MemoryRouter>
      </BookmarkProvider>
    );

    const movieImage = screen.getByAltText("The Shawshank Redemption");
    expect(movieImage).toBeInTheDocument();

  });

  it("shows one less image when one bookmark is removed'", async () => {
    const bookmarks = [moviesData[0], moviesData[1], moviesData[2]];
    const user = userEvent.setup();

    window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    render(
      <BookmarkProvider>
        <MemoryRouter initialEntries={["/bookmark"]}>
          <BookmarkPage />
        </MemoryRouter>
      </BookmarkProvider>
    );

    let images = screen.getAllByRole("img");
    expect(images).toHaveLength(bookmarks.length);

    const bookmarkIcon = screen.getAllByTestId("bookmark-icon");
    await user.click(bookmarkIcon[1]);

    images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
  });
});
