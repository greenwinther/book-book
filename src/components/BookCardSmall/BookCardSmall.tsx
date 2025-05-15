import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLibrary } from "../../contexts/LibraryContext";
import { BookStatus, BookWithStatus } from "../../types";
import { fetchCoverUrl } from "../../api/bookCover";
import "./BookCardSmall.scss";
import StatusDropdown from "../StatusDropdown/StatusDropdown";
import BookMark from "../BookMark/BookMark";

const BookCardSmall = ({ book }: { book: BookWithStatus }) => {
	const { books, updateStatus, toggleFavorite } = useLibrary();
	const [currentStatus, setCurrentStatus] = useState<BookStatus | undefined>(book.status);
	const [isFavorite, setIsFavorite] = useState<boolean>(book.isFavorite ?? false);

	useEffect(() => {
		const bookInContext = books.find((b) => b.bookKey === book.bookKey);
		if (bookInContext) {
			setCurrentStatus(bookInContext.status);
			setIsFavorite(bookInContext.isFavorite ?? false);
		}
	}, [books, book.bookKey]);

	const displayAuthors = book.author?.slice(0, 2).join(", ") || "Unknown author";
	const coverUrl = fetchCoverUrl(book.coverId, "M");

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
						onChange={(newStatus) => {
							setCurrentStatus(newStatus);
							updateStatus(book, newStatus);
						}}
					/>
					<BookMark
						isFavorite={isFavorite}
						onToggle={() => {
							setIsFavorite(!isFavorite);
							toggleFavorite(book);
						}}
						className="book-card-small-bookmark"
					/>
				</div>
			</div>
		</article>
	);
};

export default BookCardSmall;
