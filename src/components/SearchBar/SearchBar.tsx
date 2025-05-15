import "./SearchBar.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (query.trim()) {
			navigate(`/search?q=${encodeURIComponent(query.trim())}`);
			setQuery("");
		}
	};

	return (
		<form className="search-bar" onSubmit={handleSubmit} role="search" aria-label="Book search form">
			<input
				id="book-search"
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search books..."
				className="search-bar-input"
			/>
			<button type="submit" className="search-bar-button" aria-label="Submit book search">
				Search
			</button>
		</form>
	);
};

export default SearchBar;
