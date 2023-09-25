import { useParams } from "react-router";
import moviesData from "../../movies.json";
import "./moviePage.css";
import BookmarkIcon from "../../components/BookmarkIcon/BookmarkIcon";
export const MoviePage = () => {
	const { movieId } = useParams();
	const movieItem = moviesData.find((movie) => movie.id === Number(movieId));

	return (
		<div>
			<BookmarkIcon movie={movieItem}/>
			<h2>{movieItem.title}</h2>
			<div className="image-info-container">
				<div className="image-container">
					<img
						src={movieItem.thumbnail}
						alt={movieItem.title}
						className="movie-img"
					/>
				</div>
				<div className="info-container">
					<p>
						{movieItem.year},{" "}
						<span className="rating">{movieItem.rating}</span>
					</p>
					<p>Cast:</p>
					<ul className="actor-list">
						{movieItem.actors.map((actor, idx) => (
							<li key={idx}>{actor}</li>
						))}
					</ul>

					<p>Genre: {movieItem.genre}</p>
					<p>Synopsis: {movieItem.synopsis}</p>
				</div>
			</div>
		</div>
	);
};
