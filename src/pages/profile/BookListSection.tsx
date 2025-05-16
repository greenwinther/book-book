import { BookWithStatus } from "../../types";
import BookCard from "../../components/BookCard/BookCard";

/**
 * Renders a list of books with optional review display.
 * Shows a message if the book list is empty.
 */

type BookListSectionProps = {
	title: string;
	books: BookWithStatus[];
	emptyMessage: string;
	showReview?: boolean;
};

export const BookListSection = ({ title, books, emptyMessage, showReview = true }: BookListSectionProps) => {
	return (
		<section className="book-list-section">
			<h2>
				{title} ({books.length})
			</h2>
			{books.length ? (
				<ul>
					{books.map((book) => (
						<li key={book.bookKey}>
							<BookCard book={book} showReview={showReview} />
						</li>
					))}
				</ul>
			) : (
				<p>{emptyMessage}</p>
			)}
		</section>
	);
};
