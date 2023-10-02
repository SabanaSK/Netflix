import { useState } from "react";
import MovieList from "../../components/MovieList/movieList";
import SearchBar from "../../components/Searchbar/Searchbar";
import CategoryList from "../../components/CategoryList/CategoryList";
import Movie from "../../components/Movie/Movie";
import useFilterMovies from "../../hooks/useFilterMovies";

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredMovies = useFilterMovies({ searchQuery });

  return (
    <div>
      <h2>HomePage</h2>
      <CategoryList />
      <SearchBar setSearchQuery={setSearchQuery} />

      {searchQuery ? (
        <div>
          <h2>Search Results</h2>
          {filteredMovies.length === 0 ? (
            <p>No movie found.</p>
          ) : (
            filteredMovies.map((movie) => (
              <Movie key={movie.id} movie={movie} />
            ))
          )}
        </div>
      ) : (
        <MovieList />
      )}
    </div>
  );
};
