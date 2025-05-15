import { Book, BookWorkResponse } from "../types";
import fetchAuthorNames from "./fetchAuthorNames";
import fetchBookPages from "./fetchBookPages";

const fetchBookByKey = async (bookKey: string): Promise<Book | null> => {
	try {
		const response = await fetch(`https://openlibrary.org/works/${bookKey}.json`);
		if (!response.ok) throw new Error(`Failed to fetch book with status ${response.status}`);
		const data: BookWorkResponse = await response.json();

		const [authorNames, bookPages] = await Promise.all([
			fetchAuthorNames(data.authors ?? []),
			fetchBookPages(bookKey),
		]);

		return {
			bookKey: data.key.replace("/works/", ""),
			title: data.title,
			author: authorNames.length > 0 ? authorNames : ["Unknown"],
			coverId: data.covers?.[0],
			description: typeof data.description === "string" ? data.description : data.description?.value,
			genres: data.subjects?.slice(0, 5),
			firstSentence: data.first_sentence?.value,
			bookPages: bookPages ?? undefined,
		};
	} catch (err) {
		console.error("Failed to fetch book: with key", err);
		return null;
	}
};

export default fetchBookByKey;
