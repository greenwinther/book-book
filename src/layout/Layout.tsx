import { Outlet, Link } from "react-router-dom";

const Layout = () => {
	return (
		<>
			<header>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/profile">Profile</Link>
				</nav>
			</header>
			<main>
				<Outlet />
			</main>
			<footer>
				<p>Book App © 2025</p>
			</footer>
		</>
	);
};

export default Layout;
