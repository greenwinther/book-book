import { BookWithStatus } from "../../types";
import { Link } from "react-router-dom";
import { useStatus } from "../../contexts/StatusContext";
import StatusDropdown from "../StatusDropdown/StatusDropdown";

const BookCard = ({ title, author, coverId, bookKey }: BookWithStatus) => {
	const { books, addOrUpdateBook } = useStatus();
	const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : "/fallback-cover.jpg";

	const currentStatus = books.find((b) => b.bookKey === bookKey)?.status;

	return (
		<article className="book-card">
			<Link to={`${bookKey}`} className="book-card-link">
				<img src={coverUrl} alt={`Cover of ${title}`} className="book-cover" />
				<div className="book-info">
					<h3 className="book-title">{title || "Untitled"}</h3>
					<p className="book-author">{author?.join(", ") || "Unknown author"}</p>
					<span className="view-details">View details</span>
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
