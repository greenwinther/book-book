import "./ReviewForm.scss";
import { useState } from "react";
import { Book } from "../../types";
import { useLibrary } from "../../contexts/LibraryContext";

type ReviewFormProps = {
	book: Book;
};

const ReviewForm = ({ book }: ReviewFormProps) => {
	const { updateReview } = useLibrary();
	const [review, setReview] = useState("");
	const [rating, setRating] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const parsedRating = parseFloat(rating);
		if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
			alert("Rating must be a number between 0 and 5.");
			return;
		}
		updateReview(book.bookKey, review, parsedRating);

		setReview("");
		setRating("");
	};

	return (
		<div className="review-form-container">
			<form onSubmit={handleSubmit} className="review-form">
				<h3>Leave a Review</h3>
				<textarea
					value={review}
					onChange={(e) => setReview(e.target.value)}
					placeholder="Write your thoughts..."
				/>
				<input
					type="number"
					step="0.1"
					min="0"
					max="5"
					value={rating}
					onChange={(e) => setRating(e.target.value)}
					placeholder="Rating (0.0 - 5.0)"
				/>
				<button type="submit">Save Review</button>
			</form>
		</div>
	);
};

export default ReviewForm;
