import { Link, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MoviePage } from "./pages/MoviePage/MoviePage";
import BookmarkPage from "./pages/BookmarkPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import { BookmarkProvider } from "./context/BookmarkContext";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

function App() {
	const { cookies, logoutUser } = useContext(UserContext);

	return (
		<div>
			<div>
				<Link to="/Netflix/">Home</Link>
				<Link to="/Netflix/bookmark">Bookmark</Link>
				<button onClick={logoutUser}>Logout</button>
			</div>
			<BookmarkProvider>
				<Routes>
					<Route
						path="/Netflix/"
						element={
							cookies.user ? (
								<HomePage />
							) : (
								<Navigate to="/Netflix/login" />
							)
						}
					/>
					<Route
						path="/Netflix/movie/:movieId"
						element={
							cookies.user ? (
								<MoviePage />
							) : (
								<Navigate to="/Netflix/login" />
							)
						}
					/>
					<Route
						path="/Netflix/bookmark"
						element={
							cookies.user ? (
								<BookmarkPage />
							) : (
								<Navigate to="/Netflix/login" />
							)
						}
					/>
					<Route
						path="/Netflix/login"
						element={
							!cookies.user ? (
								<LoginPage />
							) : (
								<Navigate to="/Netflix/" />
							)
						}
					/>

					<Route
						path="/Netflix/category/:categoryName"
						element={
							cookies.user ? (
								<CategoryPage />
							) : (
								<Navigate to="/Netflix/login" />
							)
						}
					/>
				</Routes>
			</BookmarkProvider>
		</div>
	);
}

export default App;
