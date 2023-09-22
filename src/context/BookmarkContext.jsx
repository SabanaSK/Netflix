import { createContext, /* useContext, */ useState } from "react";
import PropTypes from "prop-types";

const BookmarkContext = createContext();

/* export const useBookmarks = () => {
  return useContext(BookmarkContext);
} */

export const BookmarkProvider = ({ children }) => {
	const [bookmarks, setBookmarks] = useState([]);

	const addBookmark = (movie) => {
		setBookmarks((prevBookmarks) => [...prevBookmarks, movie]);
	};

	const removeBookmark = (movieId) => {
		setBookmarks((prevBookmarks) =>
			prevBookmarks.filter((movie) => movie.id !== movieId)
		);
	};

	const value = {
		bookmarks,
		addBookmark,
		removeBookmark,
	};

	return (
		<BookmarkContext.Provider value={value}>
			{children}
		</BookmarkContext.Provider>
	);
};

BookmarkProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
