import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MoviePage } from "./pages/MoviePage/MoviePage";
import BookmarkPage from "./pages/BookmarkPage";

function App() {
	return (
		<div>
			<div>
				<Link to="/Netflix">Home</Link>
				<Link to="/Netflix/login">Login</Link>
				<Link to="/Netflix/bookmark">Bookmark</Link>
			</div>

			<Routes>
				<Route path="/Netflix" element={<HomePage />} />
				<Route path="/Netflix/login" element={<LoginPage />} />
				<Route path="/Netflix/movie/:movieId" element={<MoviePage />} />
				<Route path="/Netflix/bookmark" element={<BookmarkPage />} />
			</Routes>
		</div>
	);
}

export default App;
