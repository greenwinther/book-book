import "./BookCardSmall.scss";
import { Link } from "react-router-dom";
import { useLibrary } from "../../contexts/LibraryContext";
import { BookWithStatus } from "../../types";
import fetchBookCover from "../../api/fetchBookCover";
import StatusDropdown from "../StatusDropdown/StatusDropdown";
import BookMark from "../BookMark/BookMark";
import { useAuthor } from "../../contexts/AuthorContext";
import { useEffect, useState } from "react";

/**
 * Compact book card displaying cover, title, authors, reading status, and favorite toggle.
 * Fetches author info on mount and updates when authors change.
 */

const BookCardSmall = ({ book }: { book: BookWithStatus }) => {
	const { books, updateStatus, toggleFavorite } = useLibrary();
	const { getAuthor } = useAuthor();
	const [authorInfo, setAuthorInfo] = useState<{ key: string; name: string }[]>([]);
	const coverUrl = fetchBookCover(book.coverId, "M");

	const bookInContext = books.find((b) => b.bookKey === book.bookKey);
	const currentStatus = bookInContext?.status;
	const isFavorite = bookInContext?.isFavorite ?? false;

	useEffect(() => {
		const loadAuthors = async () => {
			const cappedAuthors = book.author.slice(0, 2);

			const authors = await Promise.all(
				cappedAuthors.map((author) =>
					getAuthor(author.key).then((res) => ({
						key: res.key,
						name: res.name ?? "Unknown",
					}))
				)
			);

			setAuthorInfo(authors.length > 0 ? authors : cappedAuthors);
		};

		loadAuthors();
	}, [book.author, getAuthor]);

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
					{authorInfo.map((author, index) => (
						<span key={author.key}>
							<Link to={`/author/${author.key}`} className="author">
								{author.name}
							</Link>
							{index < authorInfo.length - 1 && ", "}
						</span>
					))}
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
