import { Outlet, Link } from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar";
import "./Layout.scss";

const Layout = () => {
	return (
		<div className="app-container">
			<header className="navbar">
				<div className="navbar-container">
					<Link to="/" className="navbar-link">
						Home
					</Link>
					<SearchBar />
					<Link to="/profile" className="navbar-link">
						Profile
					</Link>
				</div>
			</header>

			<main className="main">
				<Outlet />
			</main>

			<footer className="footer">
				<p>Book App © 2025</p>
			</footer>
		</div>
	);
};

export default Layout;
