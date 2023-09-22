import { useMemo } from 'react';

const useFilterMovies = (movies, query, category) => {
  return useMemo(() => {
    let filteredMovies = [...movies];

    if (query) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.category.toLowerCase() === category.toLowerCase()
      );
    }

    return filteredMovies;
  }, [movies, query, category]);
};

export default useFilterMovies;
