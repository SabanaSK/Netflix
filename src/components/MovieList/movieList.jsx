import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./movieList.module.css";
import Movie from "../Movie/Movie";
import useFilterMovies from "../../hooks/useFilterMovies";

/**
 * - render movies based on trending and recommended
 * - carousel with react-slick
 */

const shuffleArray = (array) => {
	const shuffledArray = [...array];

	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}

	return shuffledArray;
};

const MovieList = () => {
	const movies = useFilterMovies();
	const trendingMovies = movies.filter((movie) => movie.isTrending);
	const recommendedMovies = movies.filter((movie) => !movie.isTrending);
	const shuffledRecommendedMovies = shuffleArray(recommendedMovies).slice(0, 8);

	const sliderSettings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 1,
	};

	return (
		<div>
			{/* Trending Movies */}
			<div className={styles["movie-section"]}>
				<h2>Trending</h2>
				<Slider {...sliderSettings}>
					{trendingMovies.map((movie) => (
						<Movie key={movie.id} movie={movie} />
					))}
				</Slider>
			</div>

			{/* Recommended Movies */}
			<div className={styles["movie-section"]}>
				<h2>Recommended for You</h2>
				<Slider {...sliderSettings}>
					{shuffledRecommendedMovies.map((movie) => (
						<Movie key={movie.id} movie={movie} />
					))}
				</Slider>
			</div>
		</div>
	);
};

export default MovieList;
