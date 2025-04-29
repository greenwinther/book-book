import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Book } from "../types";
import { useStatus } from "../contexts/StatusContext";
import "./BookDetails.scss";

const BookDetails = () => {
	const { bookKey } = useParams<{ bookKey: string }>();
	console.log("key from URL:", bookKey); // Debugging line to check the extracted key
	const [book, setBook] = useState<Book | null>(null);
	const [loading, setLoading] = useState(true);
	const [review, setReview] = useState("");
	const [rating, setRating] = useState(0);
	const [status, setStatus] = useState<"plan" | "reading" | "finished" | "">("");
	const [isFav, setIsFav] = useState(false);

	const { addOrUpdateBook, updateBookReview, getFavoriteBooks, books } = useStatus();

	useEffect(() => {
		const fetchBook = async () => {
			if (!bookKey) return; // Add this check to ensure key is valid

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

	// Check if the book is already in state (for status or review prefill)
	useEffect(() => {
		if (!book) return;

		const existing = books.find((b) => b.bookKey === book.bookKey);
		if (existing) {
			setStatus(existing.status ?? "");
			setReview(existing.review ?? "");
			setRating(existing.rating ?? 0);
		}

		const fav = getFavoriteBooks().some((b) => b.bookKey === book.bookKey);
		setIsFav(fav);
	}, [book, books]);

	const handleStatusChange = (newStatus: "plan" | "reading" | "finished") => {
		if (!book) return;
		setStatus(newStatus);
		addOrUpdateBook(book, newStatus, isFav);
	};

	const handleReviewSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!book) return;
		updateBookReview(book.bookKey, review, rating);
	};

	const handleToggleFavorite = () => {
		if (!book) return;
		setIsFav((prev) => {
			const newFav = !prev;
			addOrUpdateBook(book, status || undefined, newFav);
			return newFav;
		});
	};

	if (loading) return <p>Loading...</p>;
	if (!book) return <p>Book not found.</p>;

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
				<button
					onClick={() => handleStatusChange("plan")}
					className={status === "plan" ? "active" : ""}
				>
					Plan to Read
				</button>
				<button
					onClick={() => handleStatusChange("reading")}
					className={status === "reading" ? "active" : ""}
				>
					Reading
				</button>
				<button
					onClick={() => handleStatusChange("finished")}
					className={status === "finished" ? "active" : ""}
				>
					Finished
				</button>
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
				{isFav ? "Remove from Favorites" : "Add to Favorites"}
			</button>
		</div>
	);
};

export default BookDetails;
