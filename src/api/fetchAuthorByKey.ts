import { AuthorResponse } from "../types";

const fetchAuthorByKey = async (authorKey: string): Promise<AuthorResponse> => {
	try {
		console.log("Original authorKey:", authorKey);
		const cleanKey = authorKey.replace("/authors/", "");
		console.log("Cleaned authorKey:", cleanKey);
		const response = await fetch(`https://openlibrary.org/authors/${authorKey}.json`);
		if (!response.ok) {
			throw new Error(`Failed to fetch author ${authorKey}: ${response.status}`);
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
