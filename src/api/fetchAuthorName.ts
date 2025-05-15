import { AuthorResponse } from "../types";

const fetchAuthorName = async (authorKey: string): Promise<string> => {
	try {
		const response = await fetch(`https://openlibrary.org${authorKey}.json`);
		if (!response.ok) throw new Error(`HTTP error ${response.status}`);
		const data: AuthorResponse = await response.json();
		return data.name ?? "Unknown";
	} catch (err) {
		console.error(`Failed to fetch author ${authorKey}`, err);
		return "Unknown";
	}
};

const fetchAuthorNames = async (authors: { author: { key: string } }[]): Promise<string[]> =>
	Promise.all(authors.map(({ author }) => fetchAuthorName(author.key)));

export default fetchAuthorNames;
