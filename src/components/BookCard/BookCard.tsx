import { Link } from "react-router-dom";
import { BookWithStatus } from "../../types";
import StatusDropdown from "../StatusDropdown/StatusDropdown";
import { fetchCoverUrl } from "../../api/bookCover";
import "./BookCard.scss";
import BookMark from "../BookMark/BookMark";
import AverageRating from "../AverageRating/AverageRating";
import { useLibrary } from "../../contexts/LibraryContext";
import BookPages from "../BookPages/BookPages";

const BookCard = ({ book, showReview = false }: { book: BookWithStatus; showReview?: boolean }) => {
	const { books, updateStatus, toggleFavorite } = useLibrary();
	const coverUrl = fetchCoverUrl(book.coverId, "M");

	const bookInContext = books.find((b) => b.bookKey === book.bookKey);
	const currentStatus = bookInContext?.status;
	const isFavorite = bookInContext?.isFavorite ?? false;

	const review = bookInContext?.review;
	const rating = bookInContext?.rating;

	return (
		<article className="book-card">
			<Link to={`/book/${book.bookKey}`} className="book-card-link">
				<img src={coverUrl} alt={`Cover of ${book.title}`} className="book-card-cover" />
			</Link>

			<div className="book-card-content">
				<div className="book-card-top">
					<div className="book-card-info">
						<h3>{book.title || "Untitled"}</h3>
						<p className="author">{book.author?.join(", ") || "Unknown author"}</p>
						<BookPages bookKey={book.bookKey} />
					</div>

					<div className="book-card-status">
						<StatusDropdown
							status={currentStatus}
							onChange={(newStatus) => updateStatus(book, newStatus)}
						/>

						<BookMark isFavorite={isFavorite} onToggle={() => toggleFavorite(book)} />
					</div>
				</div>

				<AverageRating bookKey={book.bookKey} />
				{showReview && currentStatus === "finished" && (review || rating) && (
					<div className="user-review-snippet">
						{review && (
							<p className="review">
								{review.length > 100 ? review.slice(0, 100) + "…" : review}
							</p>
						)}
						{rating && <p className="rating">⭐ {rating.toFixed(1)}</p>}
					</div>
				)}
			</div>
		</article>
	);
};

export default BookCard;
