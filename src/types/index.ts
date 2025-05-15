// Defines the possible reading statuses of a book in the user's profile
export type BookStatus = "plan" | "reading" | "finished";

// Represents a book fetched from the Open Library API
export type Book = {
	bookKey: string;
	title: string;
	author: string[];
	coverId?: number;
	firstSentence?: string;
	description?: string;
	genres?: string[];
	bookPages?: number;
};

// Represents a book with user-specific metadata (status and/or favorite)
export type BookWithStatus = Book & {
	isFavorite?: boolean;
	status?: BookStatus;
	rating?: number;
	review?: string;
};

export type AuthorResponse = {
	key: string;
	name?: string;
	fuller_name?: string;
	bio?: string | { value: string };
	birth_date?: string;
	death_date?: string;
	photos?: number[];
};

export type RatingResponse = {
	summary?: {
		average?: number;
	};
};

export type BookWorkResponse = {
	key: string;
	title: string;
	authors?: { author: { key: string } }[];
	covers?: number[];
	description?: string | { value: string };
	subjects?: string[];
	first_sentence?: { value: string };
};

export type SubjectApiResponse = {
	works?: {
		key: string;
		title: string;
		authors?: { name: string }[];
		cover_id?: number;
	}[];
};

export type EditionListResponse = {
	entries: { key: string }[];
};

export type EditionDetailsResponse = {
	number_of_pages?: number;
};
