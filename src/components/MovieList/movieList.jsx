import moviesData from "../../movies.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./movieList.css";
import { Link } from "react-router-dom";

const MovieList = () => {
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
				{moviesData.map((movie, index) => (
					<div key={index} className="movie-thumbnail">
						<Link to={`/Netflix/movie/${movie.id}`}>
							<img src={movie.thumbnail} alt={movie.title} />
							<p>Year: {movie.year}</p>
							<p>Rating: {movie.rating}</p>
						</Link>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default MovieList;
