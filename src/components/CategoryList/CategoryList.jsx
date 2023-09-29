import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useFilterMovies from "../../hooks/useFilterMovies";

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
		navigate(`/Netflix/category/${event.target.value}`);
	};

	return (
		<div>
			<select value="Category" onChange={handleChange}>
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
