import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Book, BookStatus } from "../../types";
import StatusDropdown from "../../components/StatusDropdown/StatusDropdown";
import "./BookDetails.scss";
import { fetchBookByKey } from "../../api/book";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import { fetchCoverUrl } from "../../api/bookCover";
import AverageRating from "../../components/AverageRating/AverageRating";
import BookMark from "../../components/BookMark/BookMark";
import { useLibrary } from "../../contexts/LibraryContext";
import BookPages from "../../components/BookPages/BookPages";

const BookDetails = () => {
	const { bookKey } = useParams<{ bookKey: string }>();
	const [book, setBook] = useState<Book | null>(null);
	const [loading, setLoading] = useState(true);

	const { books, updateStatus, toggleFavorite } = useLibrary();

	useEffect(() => {
		const getBook = async () => {
			if (!bookKey) return;
			const fetched = await fetchBookByKey(bookKey);
			setBook(fetched);
			setLoading(false);
		};
		getBook();
	}, [bookKey]);

	useEffect(() => {
		if (!book) return;

		const updatedBook = books.find((b) => b.bookKey === book.bookKey);
		if (updatedBook) {
			setBook((prevBook) => ({
				...prevBook!,
				...updatedBook,
			}));
		}
	}, [books, book?.bookKey]);

	if (loading) return <p>Loading...</p>;
	if (!book) return <p>Book not found.</p>;

	const bookInContext = books.find((b) => b.bookKey === book.bookKey);
	const currentStatus: BookStatus | undefined = bookInContext?.status;
	const isFavorite = bookInContext?.isFavorite ?? false;
	const coverUrl = fetchCoverUrl(book.coverId, "L");

	return (
		<div className="book-details">
			<div className="top-section">
				<div className="cover-and-status">
					{book.coverId && <img src={coverUrl} alt={`Cover of ${book.title}`} />}
					<div className="status-controls">
						<h3>Status</h3>
						<StatusDropdown
							status={currentStatus}
							onChange={(newStatus) => updateStatus(book, newStatus)}
						/>
						<BookMark isFavorite={isFavorite} onToggle={() => toggleFavorite(book)} />
						<AverageRating bookKey={book.bookKey} />
						<BookPages bookKey={book.bookKey} />
					</div>
				</div>

				<div className="book-info">
					<h1>{book.title}</h1>
					<p className="author">by {book.author.join(", ")}</p>
					<div className="description">
						<ReactMarkdown>{book.description}</ReactMarkdown>
					</div>
				</div>

				{book.genres && (
					<div className="genres">
						<h3>Genres</h3>
						<ul>
							{book.genres.map((genre) => (
								<li key={genre}>{genre}</li>
							))}
						</ul>
					</div>
				)}
			</div>

			<div className="review-section">
				<ReviewForm book={book} />
			</div>
		</div>
	);
};

export default BookDetails;
