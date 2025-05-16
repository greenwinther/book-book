import "./BookCard.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLibrary } from "../../contexts/LibraryContext";
import { useAuthor } from "../../contexts/AuthorContext";
import { BookWithStatus } from "../../types";
import StatusDropdown from "../StatusDropdown/StatusDropdown";
import fetchBookCover from "../../api/fetchBookCover";
import BookMark from "../BookMark/BookMark";
import AverageRating from "../AverageRating/AverageRating";
import BookPages from "../BookPages/BookPages";
import ReviewDisplay from "../ReviewDisplay/ReviewDisplay";

/**
 * Displays a detailed card for a book including cover, title, authors, rating,
 * page count, reading status, and favorite toggle.
 * Optionally shows a shortened review if `showReview` is true.
 * Fetches author info on mount and updates when authors change.
 */

const BookCard = ({ book, showReview = false }: { book: BookWithStatus; showReview?: boolean }) => {
	const { books, updateStatus, toggleFavorite } = useLibrary();
	const { getAuthor } = useAuthor();
	const [authorInfo, setAuthorInfo] = useState<{ key: string; name: string }[]>([]);
	const coverUrl = fetchBookCover(book.coverId, "M");

	const bookInContext = books.find((b) => b.bookKey === book.bookKey);
	const currentStatus = bookInContext?.status;
	const isFavorite = bookInContext?.isFavorite ?? false;

	useEffect(() => {
		const loadAuthors = async () => {
			const authors = await Promise.all(
				book.author.map((author) =>
					getAuthor(author.key).then((res) => ({
						key: res.key,
						name: res.name ?? "Unknown",
					}))
				)
			);
			setAuthorInfo(authors.length > 0 ? authors : book.author);
		};

		loadAuthors();
	}, [book.author, getAuthor]);

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
						{authorInfo.map((author, index) => (
							<span key={author.key}>
								<Link to={`/author/${author.key}`} className="author-link">
									{author.name}
								</Link>
								{index < authorInfo.length - 1 && ", "}
							</span>
						))}
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
