import "./BookPages.scss";
import { useEffect, useState } from "react";
import { useLibrary } from "../../contexts/LibraryContext";
import fetchBookPages from "../../api/fetchBookPages";

/**
 * Displays the number of pages for a given book.
 * Fetches page count on mount and updates global book data if changed.
 * Returns null if no valid page count is found.
 */

type BookPagesProps = {
	bookKey: string;
};

const BookPages = ({ bookKey }: BookPagesProps) => {
	const [pages, setPages] = useState<number | null>(null);

	const { addOrUpdateBook, books } = useLibrary();

	useEffect(() => {
		const getPages = async () => {
			const pageCount = await fetchBookPages(bookKey);
			setPages(pageCount);

			if (pageCount) {
				const existing = books.find((b) => b.bookKey === bookKey);
				if (existing && existing.bookPages !== pageCount) {
					addOrUpdateBook({ ...existing, bookPages: pageCount });
				}
			}
		};
		getPages();
	}, [bookKey]);

	if (!pages || pages <= 0) return null;

	return (
		<div
			className="book-pages"
			title={`${pages} ${pages === 1 ? "page" : "pages"}`}
			aria-label={`${pages} ${pages === 1 ? "page" : "pages"}`}
		>
			<span role="img" aria-hidden="true">
				📄
			</span>{" "}
			{pages} {pages === 1 ? "page" : "pages"}
		</div>
	);
};

export default BookPages;
