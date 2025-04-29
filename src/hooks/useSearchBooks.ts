import { useEffect, useState } from "react";
import { Book } from "../types";

export const useSearchBooks = (query?: string) => {
	const [results, setResults] = useState<Book[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const searchBooks = async (searchQuery: string) => {
		if (!searchQuery) return;
		setLoading(true);
		setError(null);
		try {
			const res = await fetch(
				`https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}`
			);
			const data = await res.json();

			const books: Book[] = data.docs.slice(0, 20).map((doc: any) => ({
				bookKey: doc.key,
				title: doc.title,
				author: doc.author_name || ["Unknown"],
				coverId: doc.cover_i,
			}));

			setResults(books);
		} catch (err) {
			setError("Failed to fetch books.");
		} finally {
			setLoading(false);
		}
	};

	// Auto-run when query is provided
	useEffect(() => {
		if (query) {
			searchBooks(query);
		}
	}, [query]);

	return { results, loading, error, searchBooks };
};
