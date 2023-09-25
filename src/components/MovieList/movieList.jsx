import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./movieList.css";
import { Link } from "react-router-dom";
import BookmarkIcon from "../BookmarkIcon/BookmarkIcon";

const MovieList = ({ movies }) => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 1,
	};

	return (
		<div className="movie-thumbnails-container">
			<Slider {...settings}>
				{movies.map((movie, index) => (
					<div key={index} className="movie-thumbnail">
						<Link to={`/Netflix/movie/${movie.id}`}>
							<img src={movie.thumbnail} alt={movie.title} />
							<p>Year: {movie.year}</p>
							<p>Rating: {movie.rating}</p>
						</Link>
						<BookmarkIcon movie={movie}/>
					</div>
				))}
			</Slider>
		</div>
	);
};

MovieList.propTypes = {
	movies: PropTypes.arrayOf(
		PropTypes.shape({
			thumbnail: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			year: PropTypes.number.isRequired,
			rating: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default MovieList;
