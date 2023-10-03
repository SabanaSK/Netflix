import { useMemo } from "react";
import movies from "../movies.json";

/**
 * - return movies based on query
 * - takes searchQuery, category or movieId as prop query
 */

const useFilterMovies = (query) => {
	return useMemo(() => {
		let filteredMovies = [...movies];

		if (query && query.searchQuery) {
			filteredMovies = filteredMovies.filter((movie) =>
				movie.title.toLowerCase().includes(query.searchQuery.toLowerCase())
			);
		}

		if (query && query.category) {
			filteredMovies = filteredMovies.filter((movie) =>
				movie.genre.includes(query.category)
			);
		}

		if (query && query.movieId) {
			filteredMovies = movies.find(
				(movie) => movie.id === Number(query.movieId)
			);
		}

		return filteredMovies;
	}, [query]);
};

export default useFilterMovies;
