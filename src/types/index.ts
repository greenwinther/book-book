// Defines the possible reading statuses of a book in the user's profile
export type BookStatus = "plan" | "reading" | "finished";

// Represents a book fetched from the Open Library API
export type Book = {
	key: string;
	title: string;
	author: string;
	coverId?: number;
	firstSentence?: string;
	description?: string;
	genres?: string[];
	pageCount?: number;
};

// Represents a book that the user has marked as a favorite.
export type FavoriteBook = Book;

// Represents a book that the user has read or is in the process of reading.
export type ReadBook = Book & {
	status: BookStatus;
	rating?: number;
	review?: string;
};
