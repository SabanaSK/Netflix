import { useContext } from "react";
import { BookmarkContext } from "../../context/BookmarkContext";
import Movie from "../../components/Movie/Movie";

/**
 * - render bookmarked movies
 */

const BookmarkPage = () => {
	const { bookmarks } = useContext(BookmarkContext);

	if (bookmarks.length === 0) {
		return <p>No bookmarks saved yet!</p>;
	}

	return (
		<div>
			<h2>Your Bookmarks</h2>
			<div className="bookmarks-list">
				{bookmarks.map((movie) => (
					<Movie key={movie.id} movie={movie} />
				))}
			</div>
		</div>
	);
};

export default BookmarkPage;
