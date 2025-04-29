import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (query.trim()) {
			navigate(`/search?q=${encodeURIComponent(query.trim())}`);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search books..."
			/>
			<button type="submit">Search</button>
		</form>
	);
};

export default SearchBar;
