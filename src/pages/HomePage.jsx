import { useState } from "react";
import MovieList from "../components/MovieList/movieList";
import SearchBar from "../components/Searchbar/Searchbar";
import moviesData from "../movies.json";
import CategoryList from "../components/CategoryList/CategoryList";
import Movie from "../components/Movie/Movie";
import useFilterMovies from "../components/Filter/useFilterMovies";

export const HomePage = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const filteredMovies = useFilterMovies(moviesData, searchQuery);

	return (
		<div>
			<p>HomePage</p>
			<CategoryList />
			<SearchBar setSearchQuery={setSearchQuery}  />

			{searchQuery ? (
				<div>
					<h2>Search Results</h2>
					{filteredMovies.map((movie) => (
						<Movie key={movie.id} movie={movie} />
					))}
				</div>
			) : (
				<MovieList movies={moviesData} />
			)}
		</div>
	);
};
