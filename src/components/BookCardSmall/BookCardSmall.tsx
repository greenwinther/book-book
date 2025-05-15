import "./BookCardSmall.scss";
import { Link } from "react-router-dom";
import { useLibrary } from "../../contexts/LibraryContext";
import { BookWithStatus } from "../../types";
import fetchBookCover from "../../api/fetchBookCover";
import StatusDropdown from "../StatusDropdown/StatusDropdown";
import BookMark from "../BookMark/BookMark";

const BookCardSmall = ({ book }: { book: BookWithStatus }) => {
	const { books, updateStatus, toggleFavorite } = useLibrary();
	const coverUrl = fetchBookCover(book.coverId, "M");

	const bookInContext = books.find((b) => b.bookKey === book.bookKey);
	const currentStatus = bookInContext?.status;
	const isFavorite = bookInContext?.isFavorite ?? false;

	const displayAuthors = book.author?.slice(0, 2).join(", ") || "Unknown author";

	return (
		<article className="book-card-small">
			<div className="book-card-link">
				<Link to={`/book/${book.bookKey}`}>
					<img src={coverUrl} alt={`Cover of ${book.title}`} className="book-card-cover" />
				</Link>
			</div>
			<div className="book-card-small-content">
				<div className="book-card-small-info">
					<Link to={`/book/${book.bookKey}`}>
						<h3>{book.title || "Untitled"}</h3>
					</Link>
					<p className="author">{displayAuthors}</p>
				</div>

				<div className="book-card-small-status">
					<StatusDropdown
						status={currentStatus}
						onChange={(newStatus) => updateStatus(book, newStatus)}
					/>
					<BookMark
						isFavorite={isFavorite}
						onToggle={() => toggleFavorite(book)}
						className="book-card-small-bookmark"
					/>
				</div>
			</div>
		</article>
	);
};

export default BookCardSmall;
