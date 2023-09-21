import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { FilmPage } from "./pages/FilmPage";
import BookmarkPage from "./pages/BookmarkPage";
function App() {
	return (
		<div>
			<div>
				<Link to="/">Home</Link>
				<Link to="/login">Login</Link>
				<Link to="/film/name">Film</Link>
				<Link to="/bookmark">Bookmark</Link>
			</div>

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/film/:filmName" element={<FilmPage />} />
				<Route path="/bookmark" element={<BookmarkPage />} />
			</Routes>
		</div>
	);
}

export default App;
