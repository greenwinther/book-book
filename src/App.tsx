import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StatusProvider } from "./contexts/StatusContext";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Profile from "./pages/profile/Profile";
import SearchResults from "./pages/searchResults/SearchResults";
import BookDetails from "./pages/bookDetails/BookDetails";

function App() {
	return (
		<StatusProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="profile" element={<Profile />} />
						<Route path="works/:bookKey" element={<BookDetails />} />
						<Route path="/search" element={<SearchResults />} />
					</Route>
				</Routes>
			</Router>
		</StatusProvider>
	);
}

export default App;
