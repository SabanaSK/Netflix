import { useParams } from "react-router";
import movies from "../../movies.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./CategoryPage.module.css";

const CategoryPage = () => {
  const { categoryName } = useParams();

  const displayedMovies = new Set();

  const uniqueMovies = [];
  movies.forEach((movie) => {
    if (movie.genre.includes(categoryName) && !displayedMovies.has(movie.id)) {
      displayedMovies.add(movie.id);
      uniqueMovies.push(movie);
    }
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

  return (
    <div>
      <h2 className={styles.categoryTitle}>{categoryName}</h2>
      <ul>
        <Slider {...settings}>
          {uniqueMovies.map((movie) => (
            <li key={movie.id} className={styles["movie-thumbnail"]}>
              {/* <h3>{movie.title}</h3> */}
              <img
                src={movie.thumbnail}
                alt={movie.title}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "https://www.gpo.gov/images/default-source/leadership-1/davis.jpg";
                }}
              />
              <p>Year: {movie.year}</p>
              <p>Rating: {movie.rating}</p>
            </li>
          ))}
        </Slider>
      </ul>
    </div>
  );
};

export default CategoryPage;
