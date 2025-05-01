import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookWithStatus } from "../../types";
import { useStatus } from "../../contexts/StatusContext";
import StatusDropdown from "../StatusDropdown/StatusDropdown";
import { fetchAverageRating } from "../../api/ratings";
import "./BookCard.scss";

const BookCard = ({ title, author, coverId, bookKey }: BookWithStatus) => {
	const { books, addOrUpdateBook } = useStatus();
	const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : "/fallback-cover.jpg";

	const currentStatus = books.find((b) => b.bookKey === bookKey)?.status;

	const [rating, setRating] = useState<number | null>(null);

	useEffect(() => {
		const getRating = async () => {
			const average = await fetchAverageRating(bookKey);
			setRating(average);
		};
		getRating();
	}, [bookKey]);

	return (
		<article className="book-card">
			<Link to={`/works/${bookKey}`} className="book-card-link">
				<img src={coverUrl} alt={`Cover of ${title}`} className="book-cover" />
				<div className="book-info">
					<h3 className="book-title">{title || "Untitled"}</h3>
					<p className="book-author">{author?.join(", ") || "Unknown author"}</p>
					{rating !== null && <p className="book-rating">Average Rating: {rating.toFixed(1)}</p>}
				</div>
			</Link>

			<StatusDropdown
				status={currentStatus}
				onChange={(newStatus) => addOrUpdateBook({ title, author, coverId, bookKey }, newStatus)}
			/>
		</article>
	);
};

export default BookCard;
