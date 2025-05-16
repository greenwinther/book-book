import { Book, BookWorkResponse } from "../types";
import fetchAuthorsInfo from "./fetchAuthorsInfo";
import fetchBookPages from "./fetchBookPages";

/**
 * Fetches detailed book data by key from the Open Library API,
 * including authors and page count. Returns null if fetching fails.
 */

const fetchBookByKey = async (bookKey: string): Promise<Book | null> => {
	try {
		const cleanKey = bookKey.replace("/works/", "").trim();
		const url = `https://openlibrary.org/works/${cleanKey}.json`;
		console.log("Fetching book from URL:", url);

		const response = await fetch(url);
		if (!response.ok) throw new Error(`Failed to fetch book ${cleanKey}: ${response.status}`);

		const data: BookWorkResponse = await response.json();

		const [authorsInfo, bookPages] = await Promise.all([
			fetchAuthorsInfo(data.authors ?? []),
			fetchBookPages(cleanKey),
		]);

		return {
			bookKey: cleanKey,
			title: data.title,
			author: authorsInfo.length > 0 ? authorsInfo : [{ key: "unknown", name: "Unknown" }],
			coverId: data.covers?.[0],
			description: typeof data.description === "string" ? data.description : data.description?.value,
			genres: data.subjects?.slice(0, 5),
			firstSentence: data.first_sentence?.value,
			bookPages: bookPages ?? undefined,
		};
	} catch (err) {
		console.error("Failed to fetch book with key:", bookKey, err);
		return null;
	}
};

export default fetchBookByKey;
