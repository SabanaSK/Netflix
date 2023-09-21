import moviesData from '../../movies.json';

export const FilmPage = () => {
	/* const { filmName } = useParams() */
	const filmName = 'The Godfather';
	const movieItem = moviesData.find((movie) => movie.title === filmName);

	console.log('MOVIEITEM', movieItem);

	return (
		<div>
			<h2>Film Page</h2>
			<img src={movieItem.thumbnail} alt={movieItem.title} />
			<p>Title: {movieItem.title}</p>
			<p>Year: {movieItem.year}</p>
			<p>Rating: {movieItem.rating}</p>
			<p>Actors:</p>
			<ul>
				{movieItem.actors.map((actor) => (
					<li>{actor}</li>
				))}
			</ul>

			<p>Genre: {movieItem.genre}</p>
			<p>Synopsis: {movieItem.synopsis}</p>
		</div>
	);
};
