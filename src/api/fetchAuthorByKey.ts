import { AuthorResponse } from "../types";

/**
 * Fetches author data from the Open Library API given an author key.
 *
 * The function cleans the key to remove any leading "/authors/" path segment,
 * constructs the API URL, and retrieves the author JSON data.
 *
 * Throws an error if the authorKey is missing or the fetch fails.
 * Returns the author data with the cleaned key included.
 */

const fetchAuthorByKey = async (authorKey: string): Promise<AuthorResponse> => {
	if (!authorKey) throw new Error("Author key is missing or invalid");
	const cleanKey = authorKey.replace("/authors/", "").trim();
	try {
		const url = `https://openlibrary.org/authors/${cleanKey}.json`;
		console.log("Fetching author from URL:", url);

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to fetch author ${cleanKey}: ${response.status}`);
		}

		const data: AuthorResponse = await response.json();

		return {
			...data,
			key: cleanKey,
		};
	} catch (error) {
		console.error("Failed to fetch author with key:", authorKey, error);
		throw error;
	}
};

export default fetchAuthorByKey;
