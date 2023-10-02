import { useParams } from "react-router";
import styles from "./MoviePage.module.css";
import BookmarkIcon from "../../components/BookmarkIcon/BookmarkIcon";
import useFilterMovies from "../../hooks/useFilterMovies";

export const MoviePage = () => {
	const { movieId } = useParams();
	const movieItem = useFilterMovies({ movieId });

	return (
		<div>
			<h2>{movieItem.title}</h2>
			<div className={styles["image-info-container"]}>
				<div className={styles["image-container"]}>
					<div className={styles["bookmark-icon"]}>
						<BookmarkIcon movie={movieItem} />
					</div>
					<img
						src={movieItem.thumbnail}
						alt={movieItem.title}
						className={styles["movie-img"]}
						onError={({ currentTarget }) => {
							currentTarget.onerror = null;
							currentTarget.src =
								"https://www.gpo.gov/images/default-source/leadership-1/davis.jpg";
						}}
					/>
				</div>
				<div className={styles["info-container"]}>
					<p>
						{movieItem.year},{" "}
						<span className={styles["rating"]}>{movieItem.rating}</span>
					</p>
					<h3>Cast</h3>
					<ul className={styles["actor-list"]}>
						{movieItem.actors.map((actor, idx) => (
							<li key={idx}>{actor}</li>
						))}
					</ul>
					<h3>Genre</h3>
					<p>{movieItem.genre}</p>
					<h3>Synopsis</h3>
					<p>{movieItem.synopsis}</p>
				</div>
			</div>
		</div>
	);
};
