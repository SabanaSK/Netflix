import { useParams } from "react-router";
import Movie from "../../components/Movie/Movie";
import useFilterMovies from "../../hooks/useFilterMovies";
import CategoryList from "../../components/CategoryList/CategoryList";
/**
 * - render movies based on category
 * - get categoryName from params
 */

const CategoryPage = () => {
	const { categoryName } = useParams();

	const filteredMovies = useFilterMovies({ category: categoryName });

	return (
		<div>
					<CategoryList />
			<h2>{categoryName}</h2>
			{filteredMovies.map((movie) => (
				<Movie key={movie.id} movie={movie} />
			))}
		</div>
	);
};

export default CategoryPage;
