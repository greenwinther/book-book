import { Book } from "../types";
import getRandomItems from "../utils/getRandomItems";

export const fetchRecommendedBooks = async (subject: string): Promise<Book[]> => {
	try {
		const response = await fetch(`https://openlibrary.org/subjects/${subject}.json?limit=50`);
		const data = await response.json();
		const works = data.works;

		if (!Array.isArray(works) || works.length === 0) {
			console.warn(`No works found for subject: ${subject}`);
			return [];
		}

		const selected = getRandomItems(works, 5);

		return selected.map((work) => ({
			bookKey: work.key.replace("/works/", ""),
			title: work.title,
			author: work.authors?.map((a: any) => a.name) || ["Unknown"],
			coverId: work.cover_id,
		}));
	} catch (error) {
		console.error(`Failed to fetch recommended books for subject "${subject}":`, error);
		return [];
	}
};
