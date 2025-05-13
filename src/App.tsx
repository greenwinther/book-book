import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Profile from "./pages/profile/Profile";
import SearchResults from "./pages/searchResults/SearchResults";
import BookDetails from "./pages/bookDetails/BookDetails";
import { LibraryProvider } from "./contexts/LibraryContext";

function App() {
	return (
		<LibraryProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="profile" element={<Profile />} />
						<Route path="book/:bookKey" element={<BookDetails />} />
						<Route path="search" element={<SearchResults />} />
					</Route>
				</Routes>
			</Router>
		</LibraryProvider>
	);
}

export default App;
