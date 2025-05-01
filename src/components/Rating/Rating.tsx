import "./Rating.scss";

type RatingProps = {
	rating: number | null;
};

const Rating = ({ rating }: RatingProps) => {
	if (rating === null) return null;

	return (
		<div className="rating">
			<span>Rating: {rating.toFixed(1)}</span>
		</div>
	);
};

export default Rating;
