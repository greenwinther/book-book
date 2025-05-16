import "./Layout.scss";
import { Outlet, Link } from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar";

/**
 * Layout component defines the main app structure with header, content, and footer.
 *
 * Header contains navigation links and the search bar.
 * Main renders nested routes via <Outlet />.
 * Footer displays a simple copyright.
 *
 * Acts as the top-level wrapper for consistent UI across pages.
 */

const Layout = () => {
	return (
		<div className="app-container">
			<header className="header">
				<div className="navbar">
					<Link to="/" className="navbar-link">
						Home
					</Link>
					<Link to="profile" className="navbar-link">
						Profile
					</Link>
				</div>
				<div className="search-bar-container">
					<SearchBar />
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
