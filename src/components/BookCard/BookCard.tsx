import { BookWithStatus } from "../../types";
import { Link } from "react-router-dom";

const BookCard = ({ title, author, coverId, rating, review, bookKey }: BookWithStatus) => {
	const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : "/fallback-cover.jpg";
	return (
		<article className="book-card">
			<Link to={`${bookKey}`} className="book-card-link">
				<img src={coverUrl} alt={`Cover of ${title}`} className="book-cover" />
				<div className="book-info">
					<h3 className="book-title">{title || "Untitled"}</h3>
					<p className="book-author">{author?.join(", ") || "Unknown author"}</p>
					<span className="view-details">View details</span>
					{rating && <span> – Rated {rating}/5</span>}
					{review && <p>“{review}”</p>}
				</div>
			</Link>
		</article>
	);
};

export default BookCard;
