// src/components/ReviewForm/ReviewForm.tsx
import { useState, useEffect, FormEvent } from "react";
import "./ReviewForm.scss";

type ReviewFormProps = {
	bookKey: string;
	initialReview?: string;
	initialRating?: number;
	onSubmit: (review: string, rating: number) => void;
};

const ReviewForm = ({ bookKey, initialReview = "", initialRating = 0, onSubmit }: ReviewFormProps) => {
	const [review, setReview] = useState(initialReview);
	const [rating, setRating] = useState(initialRating);

	useEffect(() => {
		setReview(initialReview);
		setRating(initialRating);
	}, [initialReview, initialRating, bookKey]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSubmit(review, rating);
	};

	return (
		<div className="review-form">
			<h3>Review</h3>
			<form onSubmit={handleSubmit}>
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
	);
};

export default ReviewForm;
