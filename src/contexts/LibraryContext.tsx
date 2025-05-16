import { createContext, useContext, useState } from "react";
import { Book, BookWithStatus, BookStatus } from "../types";

/**
 * LibraryContext manages user's book collection with status, favorites, and reviews.
 *
 * Provides:
 * - books: all tracked books with statuses, favorites, reviews, ratings
 * - addOrUpdateBook: add new or update existing book info (status, favorite, pages)
 * - removeBook: delete a book by its key
 * - updateStatus: update reading status of a book
 * - toggleFavorite: toggle favorite flag on a book
 * - updateReview: set review text and rating for a book
 * - getBooksByStatus: retrieve books filtered by reading status
 * - getFavoriteBooks: retrieve all favorite books
 * - getPagesRead: sum total pages of all finished books
 *
 * LibraryProvider wraps app parts that need book state.
 * useLibrary hook accesses context with error if used outside provider.
 */

// Context type defining all available functions and data
type LibraryContextType = {
	books: BookWithStatus[];
	addOrUpdateBook: (book: Book, status?: BookStatus, isFavorite?: boolean) => void;
	removeBook: (bookId: string) => void;
	updateStatus: (book: Book, status: BookStatus) => void;
	toggleFavorite: (book: Book) => void;
	updateReview: (bookId: string, review: string, rating: number) => void;
	getBooksByStatus: (status: BookStatus) => BookWithStatus[];
	getFavoriteBooks: () => BookWithStatus[];
	getPagesRead: () => number;
};

// Creating the context with a default value of undefined
const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

type LibraryProviderProps = {
	children: React.ReactNode;
};

// Context provider component
export const LibraryProvider = ({ children }: LibraryProviderProps) => {
	// Main state storing all books user has interacted with (status, favorite, etc.)
	const [books, setBooks] = useState<BookWithStatus[]>([]);
	// Adds a new book or updates an existing one with new status/favorite info.
	const addOrUpdateBook = (book: Book, status?: BookStatus, isFavorite?: boolean) => {
		setBooks((prevBooks) => {
			const existing = prevBooks.find((b) => b.bookKey === book.bookKey);

			if (existing) {
				// Update existing book
				return prevBooks.map((b) =>
					b.bookKey === book.bookKey
						? {
								...b,
								status: status ?? b.status,
								isFavorite: isFavorite ?? b.isFavorite,
								bookPages: book.bookPages,
						  }
						: b
				);
			} else {
				// Add new book with optional status/favorite
				return [...prevBooks, { ...book, status, isFavorite }];
			}
		});
	};

	const updateStatus = (book: Book, status: BookStatus) => {
		const existing = books.find((b) => b.bookKey === book.bookKey);
		addOrUpdateBook(book, status, existing?.isFavorite);
	};

	const toggleFavorite = (book: Book) => {
		const existing = books.find((b) => b.bookKey === book.bookKey);
		addOrUpdateBook(book, existing?.status, !existing?.isFavorite);
	};

	// Updates the review and rating of a specific book
	const updateReview = (bookId: string, review: string, rating: number) => {
		setBooks((prevBooks) => prevBooks.map((b) => (b.bookKey === bookId ? { ...b, review, rating } : b)));
	};

	// Removes a book from the state completely using its key
	const removeBook = (bookId: string) => {
		setBooks((prevBooks) => prevBooks.filter((b) => b.bookKey !== bookId));
	};

	// Returns all books with a specific reading status (e.g., "reading", "finished")
	const getBooksByStatus = (status: BookStatus) => {
		return books.filter((b) => b.status === status);
	};

	// Returns all books marked as favorites
	const getFavoriteBooks = () => {
		return books.filter((b) => b.isFavorite);
	};

	const getPagesRead = () => {
		const finishedBooks = books.filter((book) => book.status === "finished");
		console.log("Finished books:", finishedBooks);

		const totalPages = finishedBooks.reduce((total, book) => {
			return total + (book.bookPages ?? 0);
		}, 0);

		return totalPages;
	};

	// Provide all functions and state to the component tree
	return (
		<LibraryContext.Provider
			value={{
				books,
				addOrUpdateBook,
				removeBook,
				updateStatus,
				toggleFavorite,
				updateReview,
				getBooksByStatus,
				getFavoriteBooks,
				getPagesRead,
			}}
		>
			{children}
		</LibraryContext.Provider>
	);
};

// Custom hook for accessing the status context safely
export const useLibrary = (): LibraryContextType => {
	const context = useContext(LibraryContext);
	if (!context) {
		throw new Error("useLibrary must be used within a LibraryProvider");
	}
	return context;
};
