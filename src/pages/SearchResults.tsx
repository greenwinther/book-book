import { useSearchParams } from "react-router-dom";
import { useSearchBooks } from "../hooks/useSearchBooks";
import BookCard from "../components/BookCard/BookCard";
import "./SearchResults.scss";

const SearchResults = () => {
	const [searchParams] = useSearchParams();
	const query = searchParams.get("q")?.trim() || "";

	const { results: books, loading, error } = useSearchBooks(query);

	return (
		<div className="search-results">
			<h1>Search Results for “{query}”</h1>

			{loading && <p>Loading...</p>}
			{error && <p className="error">{error}</p>}
			{!loading && !error && books.length === 0 && <p>No results found.</p>}

			<ul className="search-grid">
				{books.map((book) => (
					<li key={book.bookKey}>
						<BookCard
							bookKey={book.bookKey}
							title={book.title}
							author={book.author}
							coverId={book.coverId}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SearchResults;
