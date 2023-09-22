import { Link, Route, Routes, Navigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MoviePage } from "./pages/MoviePage/MoviePage";
import BookmarkPage from "./pages/BookmarkPage";
import { BookmarkProvider } from "./context/BookmarkContext";

function App() {
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);

	const logoutHandler = () => {
		removeCookie("user", { path: "/" });
	};

	return (
		<div>
			<div>
				<Link to="/Netflix/">Home</Link>
				<Link to="/Netflix/bookmark">Bookmark</Link>
				<button onClick={logoutHandler}>Logout</button>
			</div>
			<CookiesProvider>
				<BookmarkProvider>
					<Routes>
						<Route
							path="/Netflix/"
							element={
								cookies.user ? <HomePage /> : <Navigate to="/Netflix/login" />
							}
						/>
						<Route
							path="/Netflix/movie/:movieId"
							element={
								cookies.user ? <MoviePage /> : <Navigate to="/Netflix/login" />
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
									<LoginPage setCookie={setCookie} />
								) : (
									<Navigate to="/Netflix/" />
								)
							}
						/>
					</Routes>
				</BookmarkProvider>
			</CookiesProvider>
		</div>
	);
}

export default App;
