import "./BookMark.scss";

/**
 * Bookmark button toggling favorite status with accessible labels and dynamic styling.
 */

type BookMarkProps = {
	isFavorite: boolean;
	onToggle: () => void;
	className?: string;
};

const BookMark = ({ isFavorite, onToggle, className }: BookMarkProps) => (
	<button
		className={`bookmark ${isFavorite ? "bookmarked" : ""} ${className || ""}`}
		onClick={onToggle}
		title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
		aria-label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
	>
		<svg className="bookmark-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M19 21L12 16L5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21Z" />
		</svg>
	</button>
);

export default BookMark;
