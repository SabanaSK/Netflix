import { Link, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MoviePage } from "./pages/MoviePage/MoviePage";
import BookmarkPage from "./pages/BookmarkPage/BookmarkPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import { BookmarkProvider } from "./context/BookmarkContext";
import { useContext, useState } from "react";
import { UserContext } from "./context/UserContext";

function App() {
	const { cookies, logoutUser } = useContext(UserContext);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div>
    {cookies.user && (
      <div className="navbar">
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`side-menu ${isMenuOpen ? "side-menu-open" : ""}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/bookmark" onClick={() => setIsMenuOpen(false)}>Bookmark</Link>
          <button className="logout-btn" onClick={logoutUser}>Logout</button>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/bookmark">Bookmark</Link>
					<button className="logout-btn" onClick={logoutUser}>Logout</button>
        </div>
      </div>
			)}
			<BookmarkProvider>
				<Routes>
					<Route
						path="/"
						element={cookies.user ? <HomePage /> : <Navigate to="/login" />}
					/>
					<Route
						path="/movie/:movieId"
						element={cookies.user ? <MoviePage /> : <Navigate to="/login" />}
					/>
					<Route
						path="/bookmark"
						element={cookies.user ? <BookmarkPage /> : <Navigate to="/login" />}
					/>
					<Route
						path="/login"
						element={!cookies.user ? <LoginPage /> : <Navigate to="/" />}
					/>

					<Route
						path="/category/:categoryName"
						element={cookies.user ? <CategoryPage /> : <Navigate to="/login" />}
					/>
				</Routes>
			</BookmarkProvider>
		</div>
	);
}

export default App;
