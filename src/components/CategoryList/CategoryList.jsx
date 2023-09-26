import { useEffect, useState } from "react";
import movies from "../../movies.json";
import { useNavigate } from "react-router";

const CategoryList = () => {
	const navigate = useNavigate();
	const [genresArray, setGenresArray] = useState([]);

	useEffect(() => {
		const updatedGenres = [];

		movies.forEach((movie) => {
			const genres = movie.genre.split(",").map((genre) => genre.trim());
			genres.map((genre) => {
				if (!updatedGenres.includes(genre)) {
					updatedGenres.push(genre);
				}
			});
		});
		setGenresArray(updatedGenres);
	}, []);

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
