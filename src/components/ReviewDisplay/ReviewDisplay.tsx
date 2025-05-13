import { Book } from "../../types";
import { useLibrary } from "../../contexts/LibraryContext";

type Props = {
	book: Book;
};

const ReviewDisplay = ({ book }: Props) => {
	const { books } = useLibrary();
	const existing = books.find((b) => b.bookKey === book.bookKey);

	if (!existing?.review && !existing?.rating) return null;

	return (
		<div className="review-display">
			<h3>Your Review</h3>
			{existing.rating && (
				<p className="review-display-rating">
					<strong>Rating:</strong> {existing.rating.toFixed(1)} / 5
				</p>
			)}
			{existing.review && (
				<p className="review-display-text">
					<strong>Comment:</strong> {existing.review}
				</p>
			)}
		</div>
	);
};

export default ReviewDisplay;
