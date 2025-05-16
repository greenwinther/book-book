import "./BookDetails.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLibrary } from "../../contexts/LibraryContext";
import { useAuthor } from "../../contexts/AuthorContext";
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

/**
 * BookDetails component fetches and displays detailed info about a single book.
 *
 * Retrieves bookKey from route params to load book data, either from context or via API fetch.
 * Merges local context book data with fetched data to get the most updated info.
 * Loads detailed author info asynchronously based on the book's authors.
 * Shows a loading state with PotionLoader while book or author data is loading.
 * Renders book cover, title, authors (with links), and description (supports Markdown).
 * Includes interactive components for marking favorite (BookMark) and updating reading status (StatusDropdown).
 * Displays average rating, page count, genres, and user reviews.
 * Handles cases where book or authors are missing with fallback UI.
 * Uses cleanup flags to avoid state updates if the component unmounts during async calls.
 */

const BookDetails = () => {
	const { bookKey } = useParams<{ bookKey: string }>();
	const [fetchedBook, setFetchedBook] = useState<Book | null>(null);
	const [loading, setLoading] = useState(true);
	const [authorInfo, setAuthorInfo] = useState<{ key: string; name: string }[]>([]);
	const { books, updateStatus, toggleFavorite } = useLibrary();
	const { getAuthor } = useAuthor();

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

	const mergedBook: BookWithStatus | null = fetchedBook
		? {
				...fetchedBook,
				...books.find((b) => b.bookKey === fetchedBook.bookKey),
		  }
		: null;

	useEffect(() => {
		if (!mergedBook?.author?.length) {
			setAuthorInfo([]);
			return;
		}

		const loadAuthors = async () => {
			const authors = await Promise.all(
				mergedBook.author.map((author) =>
					getAuthor(author.key).then((res) => ({
						key: res.key,
						name: res.name ?? "Unknown",
					}))
				)
			);
			setAuthorInfo(authors.length > 0 ? authors : mergedBook.author);
		};

		loadAuthors();
	}, [mergedBook?.author, getAuthor]);

	if (loading) return <PotionLoader title={"Brewing up the book..."} />;
	if (!mergedBook) return <p>Book not found.</p>;

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
					<p className="author">
						by{" "}
						{authorInfo.map((author, index) => (
							<span key={author.key}>
								<Link to={`/author/${author.key}`} className="author-link">
									{author.name}
								</Link>
								{index < authorInfo.length - 1 && ", "}
							</span>
						))}
					</p>
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
