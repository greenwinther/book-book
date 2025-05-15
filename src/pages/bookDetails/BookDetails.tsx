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
import PotionLoader from "../../components/PotionLoader/PotionLoader";
import ReviewDisplay from "../../components/ReviewDisplay/ReviewDisplay";
import Genres from "../../components/Genres/Genres";

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

	if (loading) return <PotionLoader title={"Brewing up the book..."} />;
	if (!book) return <p>Book not found.</p>;

	const bookInContext = books.find((b) => b.bookKey === book.bookKey);
	const currentStatus: BookStatus | undefined = bookInContext?.status;
	const isFavorite = bookInContext?.isFavorite ?? false;
	const coverUrl = fetchCoverUrl(book.coverId, "L");

	return (
		<div className="book-details">
			<div className="details-top-section">
				<div className="details-cover">
					{book.coverId && <img src={coverUrl} alt={`Cover of ${book.title}`} />}
				</div>
				<div className="details-info">
					<h1>{book.title}</h1>
					<p className="author">by {book.author.join(", ")}</p>
					<div className="description">
						<ReactMarkdown>{book.description}</ReactMarkdown>
					</div>
				</div>
				<div className="details-status">
					<BookMark isFavorite={isFavorite} onToggle={() => toggleFavorite(book)} />
					<StatusDropdown
						status={currentStatus}
						onChange={(newStatus) => updateStatus(book, newStatus)}
					/>
				</div>
			</div>
			<div className="details-middle-section">
				<AverageRating bookKey={book.bookKey} />
				<BookPages bookKey={book.bookKey} />
				{book.genres && <Genres genres={book.genres} />}
			</div>
			<div className="details-bottom-section">
				<div className="review-section">
					<ReviewForm book={book} />
					<ReviewDisplay book={book} />
				</div>
			</div>
		</div>
	);
};

export default BookDetails;
