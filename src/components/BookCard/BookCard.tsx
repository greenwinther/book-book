import "./BookCard.scss";
import { Link } from "react-router-dom";
import { BookWithStatus } from "../../types";
import { useLibrary } from "../../contexts/LibraryContext";
import StatusDropdown from "../StatusDropdown/StatusDropdown";
import fetchBookCover from "../../api/fetchBookCover";
import BookMark from "../BookMark/BookMark";
import AverageRating from "../AverageRating/AverageRating";
import BookPages from "../BookPages/BookPages";
import ReviewDisplay from "../ReviewDisplay/ReviewDisplay";

const BookCard = ({ book, showReview = false }: { book: BookWithStatus; showReview?: boolean }) => {
	const { books, updateStatus, toggleFavorite } = useLibrary();
	const coverUrl = fetchBookCover(book.coverId, "M");

	const bookInContext = books.find((b) => b.bookKey === book.bookKey);
	const currentStatus = bookInContext?.status;
	const isFavorite = bookInContext?.isFavorite ?? false;

	const displayAuthors = book.author?.slice(0, 2).join(", ") || "Unknown author";

	return (
		<article className="book-card">
			<div className="cover">
				<Link to={`/book/${book.bookKey}`}>
					<img src={coverUrl} alt={`Cover of ${book.title}`} />
				</Link>
			</div>

			<div className="info">
				<div className="top-row">
					<div className="title-author">
						<Link to={`/book/${book.bookKey}`}>
							<h3>{book.title || "Untitled"}</h3>
						</Link>
						<p className="author">{displayAuthors}</p>
					</div>
					<BookMark isFavorite={isFavorite} onToggle={() => toggleFavorite(book)} />
				</div>
				<div className="middle-row">
					<div className="meta">
						<AverageRating bookKey={book.bookKey} />
						<BookPages bookKey={book.bookKey} />
					</div>
					<div className="status">
						<StatusDropdown
							status={currentStatus}
							onChange={(newStatus) => updateStatus(book, newStatus)}
						/>
					</div>
				</div>
				<div className="bottom-row">
					{showReview && book.review && <ReviewDisplay book={book} maxWords={10} />}
				</div>
			</div>
		</article>
	);
};

export default BookCard;
