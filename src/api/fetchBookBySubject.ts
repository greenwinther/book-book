import { Book, SubjectApiResponse } from "../types";
import getRandomItems from "../utils/getRandomItems";

/**
 * Fetches books for a given subject from the Open Library API,
 * randomly selecting 5 works from the results.
 * Returns an empty array if no works are found or the fetch fails.
 */

const fetchBookBySubject = async (subject: string): Promise<Book[]> => {
	try {
		const response = await fetch(`https://openlibrary.org/subjects/${subject}.json?limit=50`);
		if (!response.ok) throw new Error(`HTTP error ${response.status}`);
		const data: SubjectApiResponse = await response.json();

		const works = data.works ?? [];

		if (works.length === 0) {
			console.warn(`No works found for subject: ${subject}`);
			return [];
		}

		const selected = getRandomItems(works, 5);

		return selected.map((work) => ({
			bookKey: work.key.replace("/works/", ""),
			title: work.title,
			author: work.authors?.map((a) => ({
				key: a.key,
				name: a.name ?? "Unknown",
			})) || [{ key: "unknown", name: "Unknown" }],
			coverId: work.cover_id,
		}));
	} catch (error) {
		console.error(`Failed to fetch recommended books for subject "${subject}":`, error);
		return [];
	}
};

export default fetchBookBySubject;
