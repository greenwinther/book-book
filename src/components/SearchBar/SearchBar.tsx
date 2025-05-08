import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import SearchButton from "./SearchButton";
// import SearchTypeSelect from "./SearchTypeSelect"; // future

import "./SearchBar.scss";

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
		<form className="search-bar" onSubmit={handleSubmit}>
			{/* <SearchTypeSelect /> */}
			<SearchInput value={query} onChange={(e) => setQuery(e.target.value)} />
			<SearchButton />
		</form>
	);
};

export default SearchBar;
