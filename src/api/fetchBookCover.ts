type CoverSize = "S" | "M" | "L";

const fetchBookCover = (coverId: number | undefined, size: CoverSize = "M"): string =>
	coverId ? `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg` : "src/assets/fallback-cover.png";

export default fetchBookCover;
