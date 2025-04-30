import { Book } from "../types";
import { fetchAuthorNames } from "./authors";

// Fetch a single book by its key and transform the data
export const fetchBookByKey = async (bookKey: string): Promise<Book | null> => {
	try {
		const response = await fetch(`https://openlibrary.org/works/${bookKey}.json`);
		const data = await response.json();

		const authorNames = await fetchAuthorNames(data.authors ?? []);

		const transformed: Book = {
			bookKey: data.key.replace("/works/", ""),
			title: data.title,
			author: authorNames.length > 0 ? authorNames : ["Unknown"],
			coverId: data.covers?.[0],
			description: typeof data.description === "string" ? data.description : data.description?.value,
			genres: data.subjects?.slice(0, 5),
			firstSentence: data.first_sentence?.value,
		};

		return transformed;
	} catch (err) {
		console.error("Failed to fetch book:", err);
		return null;
	}
};
