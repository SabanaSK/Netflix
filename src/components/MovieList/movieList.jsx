import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./movieList.module.css";
import Movie from "../Movie/Movie";
import useFilterMovies from "../Filter/useFilterMovies";

const MovieList = ({ movies, category }) => {
  const filteredMovies = useFilterMovies(movies, category);

  const trendingMovies = filteredMovies.filter((movie) => movie.isTrending);
  const recommendedMovies = filteredMovies.filter((movie) => !movie.isTrending);

  const shuffledRecommendedMovies = shuffleArray(recommendedMovies).slice(0, 8);

  const settings = {
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
        <Slider {...settings}>
          {trendingMovies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </Slider>
      </div>

      {/* Recommended Movies */}
      <div className={styles["movie-section"]}>
        <h2>Recommended for You</h2>
        <Slider {...settings}>
          {shuffledRecommendedMovies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </Slider>
      </div>
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
      isTrending: PropTypes.bool,
    })
  ).isRequired,
  category: PropTypes.string,
};

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default MovieList;
