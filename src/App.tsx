import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Profile from "./pages/profile/Profile";
import SearchResults from "./pages/searchResults/SearchResults";
import BookDetails from "./pages/bookDetails/BookDetails";
import { LibraryProvider } from "./contexts/LibraryContext";
import AuthorDetails from "./pages/authorDetails/AuthorDetails";
import { AuthorProvider } from "./contexts/AuthorContext";

function App() {
	return (
		<LibraryProvider>
			<AuthorProvider>
				<Router>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="profile" element={<Profile />} />
							<Route path="book/:bookKey" element={<BookDetails />} />
							<Route path="author/:authorKey" element={<AuthorDetails />} />
							<Route path="search" element={<SearchResults />} />
						</Route>
					</Routes>
				</Router>
			</AuthorProvider>
		</LibraryProvider>
	);
}

export default App;
