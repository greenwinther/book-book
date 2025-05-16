import "./RecommendedBooks.scss";
import { useEffect, useState } from "react";
import { Book } from "../../types";
import fetchBookBySubject from "../../api/fetchBookBySubject";
import PotionLoader from "../PotionLoader/PotionLoader";
import BookCardSmall from "../BookCardSmall/BookCardSmall";

/**
 * Fetches and displays a list of recommended books based on the given subject.
 * Shows a loading potion animation while fetching.
 * Uses a compact book card to render each recommended book.
 */

type RecommendedBooksProps = {
	subject?: string;
	title?: string;
};

const RecommendedBooks = ({ subject = "fantasy", title = "Recommended Books" }: RecommendedBooksProps) => {
	const [books, setBooks] = useState<Book[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBooks = async () => {
			setLoading(true);
			const recommended = await fetchBookBySubject(subject);
			setBooks(recommended);
			setLoading(false);
		};
		fetchBooks();
	}, [subject]);

	if (loading) return <PotionLoader title={"Brewing up some books..."} />;

	return (
		<section className="recommended-books">
			<h2>{title}</h2>
			<div className="book-list">
				{books.map((book) => (
					<BookCardSmall key={book.bookKey} book={book} />
				))}
			</div>
		</section>
	);
};

export default RecommendedBooks;
