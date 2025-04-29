import { BookWithStatus } from "../../types";
import BookCard from "../../components/BookCard/BookCard";

type BookListSectionProps = {
	title: string;
	books: BookWithStatus[];
	emptyMessage: string;
};

export const BookListSection = ({ title, books, emptyMessage }: BookListSectionProps) => {
	return (
		<section className="book-list-section">
			<h2>
				{title} ({books.length})
			</h2>
			{books.length ? (
				<ul>
					{books.map((book) => (
						<li key={book.bookKey}>
							<BookCard {...book} />
						</li>
					))}
				</ul>
			) : (
				<p>{emptyMessage}</p>
			)}
		</section>
	);
};
