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
				<img src={coverUrl} alt={`Cover of ${title}`} className="book-card__cover" />
			</Link>

			<div className="book-card__content">
				<div className="book-card__top">
					<div className="book-card__info">
						<h3>{title || "Untitled"}</h3>
						<p className="author">{author?.join(", ") || "Unknown author"}</p>
					</div>
					<div className="book-card__status">
						<StatusDropdown
							status={currentStatus}
							onChange={(newStatus) =>
								addOrUpdateBook({ title, author, coverId, bookKey }, newStatus)
							}
						/>
					</div>
				</div>

				{rating !== null && <p className="book-card__rating">Average Rating: {rating.toFixed(1)}</p>}
			</div>
		</article>
	);
};

export default BookCard;
