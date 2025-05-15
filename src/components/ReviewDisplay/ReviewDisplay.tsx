import "./ReviewDisplay.scss";
import { Book } from "../../types";
import { useLibrary } from "../../contexts/LibraryContext";

type ReviewDisplayProps = {
	book: Book;
	maxWords?: number;
};

const ReviewDisplay = ({ book, maxWords }: ReviewDisplayProps) => {
	const { books } = useLibrary();
	const existing = books.find((b) => b.bookKey === book.bookKey);

	if (!existing?.review && !existing?.rating) return null;

	const truncatedReview = maxWords
		? existing.review?.split(" ").slice(0, maxWords).join(" ") + "…"
		: existing.review;

	return (
		<div className="review-display">
			{existing.rating && (
				<p className="review-display-rating">
					<strong>Rating:</strong> {existing.rating.toFixed(1)} / 5
				</p>
			)}
			{existing.review && (
				<p className="review-display-text">
					<strong>Comment:</strong> {truncatedReview}
				</p>
			)}
		</div>
	);
};

export default ReviewDisplay;
