// import { render } from "@testing-library/react";
// import MovieList from "./movieList";
// import { it, describe, expect } from "vitest";


// const mockMovies = [
//   {
//     id: 1,
//     thumbnail: "image1.jpg",
//     title: "Movie 1",
//     year: 2022,
//     rating: "PG-13",
//   },

// ];

// describe("MovieList component", () => {
//   it("should render movie thumbnails with correct data", () => {
//     // Render en component with 'movies' prop
//     const { getAllByAltText } = render(<MovieList movies={mockMovies} />);

//     // Get all image elements by their alt text
//     const movieThumbnails = getAllByAltText((alt, img) => img);

//     // Assertions to check if movie thumbnails are rendered correctly
//     expect(movieThumbnails.length).toBe(mockMovies.length);

//     // Check if each thumbnail image's alt text matches the movie title
//     movieThumbnails.forEach((thumbnail, index) => {
//       expect(thumbnail.alt).toBe(mockMovies[index].title);
//     });


//   });
// });







// it("should render movie titles with correct data", () => {
//   // Render the component with 'movies' prop
//   // Assertions to check if movie titles are rendered correctly
// });

// it("should render movie years with correct data", () => {
//   // Render the component with 'movies' prop
//   // Assertions to check if movie years are rendered correctly
// });

// it("should render movie ratings with correct data", () => {
//   // Render the component with 'movies' prop
//   // Assertions to check if movie ratings are rendered correctly
// });



