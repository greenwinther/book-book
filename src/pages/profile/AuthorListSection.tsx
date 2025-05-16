import BookMark from "../../components/BookMark/BookMark";
import { useAuthor } from "../../contexts/AuthorContext";
import { AuthorResponse } from "../../types";
import React from "react";

/**
 * Displays a list of authors with their photos and favorite toggles.
 * Shows a fallback message if no authors are provided.
 */

type AuthorListSectionProps = {
	title: string;
	authors: AuthorResponse[];
	emptyMessage?: string;
};

const AuthorListSection: React.FC<AuthorListSectionProps> = ({
	title,
	authors,
	emptyMessage = "No authors found.",
}) => {
	const { toggleFavoriteAuthor, isFavoriteAuthor } = useAuthor();

	if (authors.length === 0) {
		return (
			<section className="author-list-section">
				<h2>{title}</h2>
				<p>{emptyMessage}</p>
			</section>
		);
	}

	return (
		<section className="author-list-section">
			<h2>{title}</h2>
			<ul className="author-list">
				{authors.map((author) => {
					const isFavorite = isFavoriteAuthor(author.key);

					return (
						<li key={author.key} className="author-list-item">
							<div className="author-card">
								{author.photos && author.photos.length > 0 && (
									<img
										src={`https://covers.openlibrary.org/b/id/${author.photos[0]}-M.jpg`}
										alt={`Portrait of ${author.name}`}
										className="author-photo"
									/>
								)}
								<div className="author-info">
									<h3>{author.name}</h3>
								</div>
								<BookMark
									isFavorite={isFavorite}
									onToggle={() => toggleFavoriteAuthor(author.key)}
									className="author-bookmark"
								/>
							</div>
						</li>
					);
				})}
			</ul>
		</section>
	);
};

export default AuthorListSection;
