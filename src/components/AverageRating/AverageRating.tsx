import "./AverageRating.scss";
import { useEffect, useState } from "react";
import fetchAverageRating from "../../api/fetchAverageRating";

/**
 * Displays the average rating for a book based on its key.
 * Fetches rating on mount and updates when the key changes.
 * Returns null if no rating is available.
 */

type RatingProps = {
	bookKey: string;
};

const AverageRating = ({ bookKey }: RatingProps) => {
	const [averageRating, setAverageRating] = useState<number | null>(null);

	useEffect(() => {
		const getRating = async () => {
			const average = await fetchAverageRating(bookKey);
			setAverageRating(average);
		};
		getRating();
	}, [bookKey]);

	if (averageRating === null) return null;

	return (
		<div
			className="averagerating"
			title={`Average Rating: ${averageRating.toFixed(1)}`}
			aria-label={`Average Rating: ${averageRating.toFixed(1)}`}
		>
			<span role="img" aria-hidden="true">
				🔮
			</span>{" "}
			{averageRating.toFixed(1)}
		</div>
	);
};

export default AverageRating;
