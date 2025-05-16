import { EditionDetailsResponse, EditionListResponse } from "../types";

/**
 * Fetches the number of pages from the first available edition of a book by its key.
 * Returns null if no page count is found or the fetch fails.
 */

const fetchBookPages = async (bookKey: string): Promise<number | null> => {
	try {
		const response = await fetch(`https://openlibrary.org/works/${bookKey}/editions.json?limit=1`);
		if (!response.ok) throw new Error(`Failed to fetch editions: ${response.status}`);
		const data: EditionListResponse = await response.json();

		const editionKeys = data.entries?.map((e) => e.key).filter(Boolean) ?? [];

		// Fetch all editions in parallel, ignore failed fetches gracefully
		const editionDetails = await Promise.all(
			editionKeys.map(async (key) => {
				try {
					const editionRes = await fetch(`https://openlibrary.org${key}.json`);
					if (!editionRes.ok) return null;
					const editionData: EditionDetailsResponse = await editionRes.json();
					return editionData;
				} catch {
					return null;
				}
			})
		);

		// Find first edition with a valid number_of_pages
		for (const edition of editionDetails) {
			if (edition && typeof edition.number_of_pages === "number") {
				return edition.number_of_pages;
			}
		}

		return null;
	} catch (err) {
		console.error("Failed to fetch page count:", err);
		return null;
	}
};

export default fetchBookPages;
