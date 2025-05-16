import { AuthorInfo, AuthorResponse } from "../types";

/**
 * Fetches author name and key from the Open Library API.
 * Returns "Unknown" if fetching fails or name is missing.
 */

const fetchAuthorInfo = async (authorKey: string): Promise<AuthorInfo> => {
	if (!authorKey) throw new Error("Author key is missing or invalid");
	const cleanKey = authorKey.replace("/authors/", "").trim();
	try {
		const url = `https://openlibrary.org/authors/${cleanKey}.json`;
		console.log("Fetching author from URL:", url);

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error ${response.status}`);
		}

		const data: AuthorResponse = await response.json();

		return {
			key: cleanKey,
			name: data.name ?? "Unknown",
		};
	} catch (err) {
		console.error(`Failed to fetch author ${authorKey}`, err);
		return {
			key: cleanKey,
			name: "Unknown",
		};
	}
};

/**
 * Fetches info for multiple authors concurrently.
 */

const fetchAuthorsInfo = async (authors: { author: { key: string } }[]): Promise<AuthorInfo[]> =>
	Promise.all(authors.map(({ author }) => fetchAuthorInfo(author.key)));

export default fetchAuthorsInfo;
