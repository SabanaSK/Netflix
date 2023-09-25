import { useState } from "react";
import MovieList from "../components/MovieList/movieList";
import SearchBar from "../components/Searchbar/Searchbar";
import useFilterMovies from "../components/Filter/useFilterMovies";
import moviesData from "../movies.json"
export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

	const filteredMovies = useFilterMovies(moviesData, searchQuery, );

	return(
		<div> 
	<p>HomePage</p>
	<SearchBar setSearchQuery={setSearchQuery} />
	<MovieList movies={filteredMovies}/>
	</div>
	)
	;
};