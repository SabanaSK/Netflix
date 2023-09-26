import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./movie.module.css";

const Movie = ({ movie }) => (
  <div className={styles["movie-thumbnail"]}>
    <Link to={`/Netflix/movie/${movie.id}`}>
      <img src={movie.thumbnail} alt={movie.title} />
      <p>Year: {movie.year}</p>
      <p>Rating: {movie.rating}</p>
    </Link>
  </div>
);

Movie.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    rating: PropTypes.string.isRequired,
  }).isRequired,
};

export default Movie;
