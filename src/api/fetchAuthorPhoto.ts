type AuthorPhotoSize = "S" | "M" | "L";

const fetchAuthorPhoto = (photos?: number[], size: AuthorPhotoSize = "L"): string =>
	photos?.[0]
		? `https://covers.openlibrary.org/a/id/${photos[0]}-${size}.jpg`
		: "src/assets/fallback-cover.png";

export default fetchAuthorPhoto;
