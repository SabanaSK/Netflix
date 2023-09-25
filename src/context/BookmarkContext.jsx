import { createContext, useState, useEffect } from 'react';
import PropTypes from "prop-types";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(savedBookmarks);
  }, []);

  const addBookmark = (movie) => {
    const newBookmarks = [...bookmarks, movie];
    setBookmarks(newBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
  };

  const removeBookmark = (movieId) => {
    const newBookmarks = bookmarks.filter(movie => movie.id !== movieId);
    setBookmarks(newBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
  };

  const value = {
    bookmarks,
    addBookmark,
    removeBookmark,
  };

	BookmarkProvider.propTypes = {
		children: PropTypes.node.isRequired,
	};

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};
