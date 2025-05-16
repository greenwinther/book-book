/**
 * Generates the URL for an author's photo based on the first photo ID in the array and requested size.
 *
 * If no photo IDs are provided, returns a fallback local image path.
 * The size parameter controls the photo resolution ("S", "M", or "L"), defaulting to large.
 */

type AuthorPhotoSize = "S" | "M" | "L";

const fetchAuthorPhoto = (photos?: number[], size: AuthorPhotoSize = "L"): string =>
	photos?.[0]
		? `https://covers.openlibrary.org/a/id/${photos[0]}-${size}.jpg`
		: "src/assets/fallback-cover.png";

export default fetchAuthorPhoto;
