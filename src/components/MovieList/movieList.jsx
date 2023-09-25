
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./movieList.css";
import { Link } from "react-router-dom";



const MovieList = ({ movies }) => {
  // Separate movies into Trending and Recommended arrays
  const trendingMovies = movies.filter((movie) => movie.isTrending);
  const recommendedMovies = movies.filter((movie) => !movie.isTrending);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

  return (
    <div className="movie-thumbnails-container">
         {/* Trending Movies */}
      <div className="movie-section">
        <h2>Trending</h2>
        <Slider {...settings}>
          {trendingMovies.map((movie) => (
            <div key={movie.id} className="movie-thumbnail">
              <Link to={`/Netflix/movie/${movie.id}`}>
                <img src={movie.thumbnail} alt={movie.title} />
                <p>Year: {movie.year}</p>
                <p>Rating: {movie.rating}</p>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
      {/* Recommended Movies */}
      <div className="movie-section">
        <h2>Recommended for You</h2>
        <Slider {...settings}>
          {recommendedMovies.map((movie, index) => (
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
      isTrending: PropTypes.bool, // Add isTrending to the prop types
    })
  ).isRequired,
};

export default MovieList;

