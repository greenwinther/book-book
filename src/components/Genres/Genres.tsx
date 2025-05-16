import "./Genres.scss";
import React from "react";

/**
 * Displays a list of book genres, limited to a maximum number.
 * Defaults to showing up to 5 genres if max is not specified.
 */

type GenresProps = {
	genres?: string[];
	max?: number;
};

const Genres: React.FC<GenresProps> = ({ genres = [], max = 5 }) => {
	const limitedGenres = genres.slice(0, max);

	return (
		<div className="genres-container">
			<h3>Genres</h3>
			<ul>
				{limitedGenres.map((genre) => (
					<li key={genre}>{genre}</li>
				))}
			</ul>
		</div>
	);
};

export default Genres;
