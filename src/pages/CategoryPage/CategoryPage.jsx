import { useParams } from "react-router";
import movies from "../../movies.json";
import Movie from "../../components/Movie/Movie";

const CategoryPage = () => {
  const { categoryName } = useParams();

  const filteredMovies = movies.filter((movie) =>
    movie.genre.includes(categoryName)
  );

  return (
    <div>
      <h2>{categoryName}</h2>
      {filteredMovies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default CategoryPage;
