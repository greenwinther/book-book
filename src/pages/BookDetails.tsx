import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Book, BookStatus } from "../types";
import { useStatus } from "../contexts/StatusContext";
import StatusDropdown from "../components/StatusDropdown/StatusDropdown";
import "./BookDetails.scss";

const BookDetails = () => {
	const { bookKey } = useParams<{ bookKey: string }>();
	const [book, setBook] = useState<Book | null>(null);
	const [loading, setLoading] = useState(true);
	const [review, setReview] = useState("");
	const [rating, setRating] = useState(0);

	const { books, addOrUpdateBook, updateBookReview } = useStatus();

	useEffect(() => {
		const fetchBook = async () => {
			if (!bookKey) return;
			try {
				const response = await fetch(`https://openlibrary.org/works/${bookKey}.json`);
				const data = await response.json();
				const transformed: Book = {
					bookKey: data.key,
					title: data.title,
					author: data.authors?.map((a: any) => a.name) ?? ["Unknown"],
					coverId: data.covers?.[0],
					description:
						typeof data.description === "string" ? data.description : data.description?.value,
					genres: data.subjects?.slice(0, 5),
					firstSentence: data.first_sentence?.value,
				};
				setBook(transformed);
			} catch (error) {
				console.error("Failed to fetch book details", error);
			} finally {
				setLoading(false);
			}
		};

		fetchBook();
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

	const handleReviewSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		updateBookReview(book.bookKey, review, rating);
	};

	const handleToggleFavorite = () => {
		addOrUpdateBook(book, currentStatus || undefined, !isFavorite);
	};

	return (
		<div className="book-details">
			<h1>{book.title}</h1>
			<p>by {book.author.join(", ")}</p>
			{book.coverId && (
				<img
					src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
					alt={`Cover of ${book.title}`}
				/>
			)}

			<p>{book.description}</p>

			<div className="status-controls">
				<h3>Status</h3>
				<StatusDropdown
					status={currentStatus}
					onChange={(newStatus) => addOrUpdateBook(book, newStatus, isFavorite)}
				/>
			</div>

			<div className="review-form">
				<h3>Review</h3>
				<form onSubmit={handleReviewSubmit}>
					<textarea
						value={review}
						onChange={(e) => setReview(e.target.value)}
						placeholder="Write your thoughts..."
					/>
					<input
						type="number"
						min={1}
						max={5}
						value={rating}
						onChange={(e) => setRating(Number(e.target.value))}
					/>
					<button type="submit">Save Review</button>
				</form>
			</div>

			<button onClick={handleToggleFavorite}>
				{isFavorite ? "Remove from Favorites" : "Add to Favorites"}
			</button>
		</div>
	);
};

export default BookDetails;
