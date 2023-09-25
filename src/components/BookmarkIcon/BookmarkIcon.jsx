import { useContext } from "react";
import PropTypes from "prop-types";
import styles from "./BookmarkIcon.module.css";
import { BookmarkContext } from "../../context/BookmarkContext";  

const BookmarkIcon = ({ movie }) => {
  const { bookmarks, addBookmark, removeBookmark } = useContext(BookmarkContext);
  
  const isBookmarked = bookmarks.some((bookmark) => bookmark.id === movie.id);
  
  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(movie.id);
    } else {
      addBookmark(movie);
    }
  };

  return <i onClick={toggleBookmark} className={`${styles["bookmark-icon"]} ${isBookmarked ? styles.bookmarked : ""}`}>★</i>
};

BookmarkIcon.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default BookmarkIcon;
