import "./BookDetails.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLibrary } from "../../contexts/LibraryContext";
import { Book, BookWithStatus } from "../../types";
import ReactMarkdown from "react-markdown";
import StatusDropdown from "../../components/StatusDropdown/StatusDropdown";
import fetchBookByKey from "../../api/fetchBookByKey";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import fetchBookCover from "../../api/fetchBookCover";
import AverageRating from "../../components/AverageRating/AverageRating";
import BookMark from "../../components/BookMark/BookMark";
import BookPages from "../../components/BookPages/BookPages";
import PotionLoader from "../../components/PotionLoader/PotionLoader";
import ReviewDisplay from "../../components/ReviewDisplay/ReviewDisplay";
import Genres from "../../components/Genres/Genres";

const BookDetails = () => {
	const { bookKey } = useParams<{ bookKey: string }>();
	const [fetchedBook, setFetchedBook] = useState<Book | null>(null);
	const [loading, setLoading] = useState(true);
	const { books, updateStatus, toggleFavorite } = useLibrary();

	useEffect(() => {
		const loadBook = async () => {
			if (!bookKey) return;
			const bookInContext = books.find((b) => b.bookKey === bookKey);
			if (bookInContext) {
				setFetchedBook(bookInContext);
				setLoading(false);
			} else {
				const fetched = await fetchBookByKey(bookKey);
				setFetchedBook(fetched);
				setLoading(false);
			}
		};
		loadBook();
	}, [bookKey, books]);

	if (loading) return <PotionLoader title={"Brewing up the book..."} />;
	if (!fetchedBook) return <p>Book not found.</p>;

	const bookInContext = books.find((b) => b.bookKey === fetchedBook.bookKey);
	const mergedBook: BookWithStatus = {
		...fetchedBook,
		...bookInContext,
	};

	const coverUrl = fetchBookCover(mergedBook.coverId, "L");
	const isFavorite = mergedBook.isFavorite ?? false;
	const currentStatus = mergedBook.status;

	return (
		<div className="book-details">
			<div className="details-top-section">
				<div className="details-cover">
					{mergedBook.coverId && <img src={coverUrl} alt={`Cover of ${mergedBook.title}`} />}
				</div>
				<div className="details-info">
					<h1>{mergedBook.title}</h1>
					<p className="author">by {mergedBook.author.join(", ")}</p>
					<div className="description">
						<ReactMarkdown>{mergedBook.description}</ReactMarkdown>
					</div>
				</div>
				<div className="details-status">
					<BookMark isFavorite={isFavorite} onToggle={() => toggleFavorite(mergedBook)} />
					<StatusDropdown
						status={currentStatus}
						onChange={(newStatus) => updateStatus(mergedBook, newStatus)}
					/>
				</div>
			</div>

			<div className="details-middle-section">
				<AverageRating bookKey={mergedBook.bookKey} />
				<BookPages bookKey={mergedBook.bookKey} />
				{mergedBook.genres && <Genres genres={mergedBook.genres} />}
			</div>

			<div className="details-bottom-section">
				<div className="review-section">
					<ReviewForm book={mergedBook} />
					<ReviewDisplay book={mergedBook} />
				</div>
			</div>
		</div>
	);
};

export default BookDetails;
