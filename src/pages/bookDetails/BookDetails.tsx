import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Book, BookStatus } from "../../types";
import { useStatus } from "../../contexts/StatusContext";
import StatusDropdown from "../../components/StatusDropdown/StatusDropdown";
import "./BookDetails.scss";
import { fetchBookByKey } from "../../api/book";
import ReviewForm from "../../components/ReviewForm/ReviewForm";

const BookDetails = () => {
	const { bookKey } = useParams<{ bookKey: string }>();
	const [book, setBook] = useState<Book | null>(null);
	const [loading, setLoading] = useState(true);
	const [review, setReview] = useState("");
	const [rating, setRating] = useState(0);

	const { books, addOrUpdateBook, updateBookReview } = useStatus();

	useEffect(() => {
		const getBook = async () => {
			if (!bookKey) return;
			const fetched = await fetchBookByKey(bookKey); // Use the new function
			setBook(fetched);
			setLoading(false);
		};
		getBook();
	}, [bookKey]);

	useEffect(() => {
		if (!book) return;
		const existing = books.find((b) => b.bookKey === book.bookKey);
		if (existing) {
			setReview(existing.review ?? "");
			setRating(existing.rating ?? 0);
		}
	}, [book, books]);

	if (loading) return <p>Loading...</p>;
	if (!book) return <p>Book not found.</p>;

	const existing = books.find((b) => b.bookKey === book.bookKey);
	const currentStatus: BookStatus | undefined = existing?.status;
	const isFavorite = existing?.isFavorite ?? false;

	const handleToggleFavorite = () => {
		addOrUpdateBook(book, currentStatus || undefined, !isFavorite);
	};

	return (
		<div className="book-details">
			<div className="top-section">
				<div className="cover-and-status">
					{book.coverId && (
						<img
							src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
							alt={`Cover of ${book.title}`}
						/>
					)}
					<div className="status-controls">
						<h3>Status</h3>
						<StatusDropdown
							status={currentStatus}
							onChange={(newStatus) => addOrUpdateBook(book, newStatus, isFavorite)}
						/>
						<button onClick={handleToggleFavorite}>
							{isFavorite ? "Remove from Favorites" : "Add to Favorites"}
						</button>
					</div>
				</div>

				<div className="book-info">
					<h1>{book.title}</h1>
					<p className="author">by {book.author.join(", ")}</p>
					<p className="description">{book.description}</p>
				</div>
			</div>

			<div className="review-section">
				<ReviewForm
					bookKey={book.bookKey}
					initialReview={review}
					initialRating={rating}
					onSubmit={(review, rating) => updateBookReview(book.bookKey, review, rating)}
				/>
			</div>
		</div>
	);
};

export default BookDetails;
