type CoverSize = "S" | "M" | "L";

export const fetchCoverUrl = (coverId: number | undefined, size: CoverSize = "M"): string =>
	coverId ? `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg` : "src/assets/fallback-cover.PNG";
