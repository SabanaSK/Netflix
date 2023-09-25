import { useEffect, useState } from "react";
import movies from "../../movies.json";

const CategoryList = () => {
	const [genresArray, setGenresArray] = useState([]);
	const [value, setValue] = useState("");

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
		setValue(event.target.value);
	};

	return (
		<div>
			<label>
				Category:
				<select value={value} onChange={handleChange}>
					<option value="All">All</option>
					{genresArray.map((genre) => (
						<option value={genre} key={genre}>
							{genre}
						</option>
					))}
				</select>
			</label>
		</div>
	);
};

export default CategoryList;
