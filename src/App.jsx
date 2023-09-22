import { Link, Route, Routes } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MoviePage } from "./pages/MoviePage/MoviePage";
import BookmarkPage from "./pages/BookmarkPage";
import { BookmarkProvider } from "./context/BookmarkContext";

function App() {
	const [cookies, setCookie] = useCookies(["user"]);

	return (
		<div>
			<div>
				<Link to="/Netflix/">Home</Link>
				<Link to="/Netflix/bookmark">Bookmark</Link>
			</div>
			<CookiesProvider>
				<BookmarkProvider>
					<Routes>
						{cookies.user ? (
							<>
								<Route
									path="/Netflix/"
									element={<HomePage />}
								/>

								<Route
									path="/Netflix/movie/:movieId"
									element={<MoviePage />}
								/>
								<Route
									path="/Netflix/bookmark"
									element={<BookmarkPage />}
								/>
							</>
						) : (
							<Route
								path="/Netflix/login"
								element={<LoginPage setCookie={setCookie} />}
							/>
						)}
					</Routes>
				</BookmarkProvider>
			</CookiesProvider>
		</div>
	);
}

export default App;
