/**
 * Generates a URL for a book cover image based on cover ID and size.
 * Returns a fallback image path if no cover ID is provided.
 */

type CoverSize = "S" | "M" | "L";

const fetchBookCover = (coverId: number | undefined, size: CoverSize = "M"): string =>
	coverId ? `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg` : "src/assets/fallback-cover.png";

export default fetchBookCover;
