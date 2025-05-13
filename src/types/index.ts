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
