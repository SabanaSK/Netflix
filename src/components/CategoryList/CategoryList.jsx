import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useFilterMovies from "../../hooks/useFilterMovies";
import styles from "./Category.module.css";

/**
 * - select list with all movie genres
 */

const CategoryList = () => {
	const navigate = useNavigate();
	const movies = useFilterMovies();
	const [genresArray, setGenresArray] = useState([]);

	useEffect(() => {
		const trimmedGenres = [];

		movies.forEach((movie) => {
			const genres = movie.genre.split(",").map((genre) => genre.trim());
			genres.map((genre) => {
				if (!trimmedGenres.includes(genre)) {
					trimmedGenres.push(genre);
				}
			});
		});
		setGenresArray(trimmedGenres);
	}, [movies]);

	const handleChange = (event) => {
		navigate(`/category/${event.target.value}`);
	};

	return (
		<div className={styles["category-container"]}>
			<select
				className={styles["category-dropdown"]}
				value="Category"
				onChange={handleChange}
			>
				<option value="">Category</option>
				{genresArray.map((genre) => (
					<option value={genre} key={genre}>
						{genre}
					</option>
				))}
			</select>
		</div>
	);
};

export default CategoryList;
