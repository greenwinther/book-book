/**
 * Type definitions for books, authors, and related API responses.
 * Includes user-specific book metadata like reading status and favorites.
 */

// Possible reading statuses for a book in user's profile
export type BookStatus = "plan" | "reading" | "finished";

// Basic book info fetched from Open Library API
export type Book = {
	bookKey: string;
	title: string;
	author: AuthorInfo[];
	coverId?: number;
	firstSentence?: string;
	description?: string;
	genres?: string[];
	bookPages?: number;
};

// Simplified author info (key and name)
export type AuthorInfo = {
	key: string;
	name: string;
};

// Extends Book with user metadata like favorite status, reading status, rating, review
export type BookWithStatus = Book & {
	isFavorite?: boolean;
	status?: BookStatus;
	rating?: number;
	review?: string;
};

// Detailed author info from API
export type AuthorResponse = {
	key: string;
	name?: string;
	fuller_name?: string;
	bio?: string | { value: string };
	birth_date?: string;
	death_date?: string;
	photos?: number[];
};

// Response shape for ratings summary
export type RatingResponse = {
	summary?: {
		average?: number;
	};
};

// Response shape for detailed book work info
export type BookWorkResponse = {
	key: string;
	title: string;
	authors?: { author: { key: string } }[];
	covers?: number[];
	description?: string | { value: string };
	subjects?: string[];
	first_sentence?: { value: string };
};

// API response for subject endpoint listing works by subject
export type SubjectApiResponse = {
	works?: {
		key: string;
		title: string;
		authors?: AuthorInfo[];
		cover_id?: number;
	}[];
};

// Response for list of editions for a book/work
export type EditionListResponse = {
	entries: { key: string }[];
};

// Response for edition details (e.g., page count)
export type EditionDetailsResponse = {
	number_of_pages?: number;
};
