import { useEffect, useState } from "react";
import { Book } from "../types";

/**
 * Custom hook to search books by query using Open Library API.
 * Manages loading, error, and search results state.
 * Automatically performs search when query changes.
 */

const useSearchBooks = (query?: string) => {
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

			const books: Book[] = data.docs.slice(0, 5).map((doc: any) => {
				const authorNames: string[] = doc.author_name ?? ["Unknown"];
				const authorKeys: string[] = doc.author_key ?? [];

				const authors = authorNames.map((name, i) => {
					const key = authorKeys?.[i];
					return key ? { key, name } : { name };
				});

				return {
					bookKey: doc.key.replace("/works/", ""),
					title: doc.title,
					author: authors,
					coverId: doc.cover_i,
				};
			});

			setResults(books);
		} catch (err) {
			setError("Failed to fetch books.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (query) {
			searchBooks(query);
		}
	}, [query]);

	return { results, loading, error, searchBooks };
};

export default useSearchBooks;
