import React, { createContext, useContext, useState } from "react";
import { Book, BookWithStatus, BookStatus } from "../types";

// Context interface defining all available functions and data
type StatusContextType = {
	books: BookWithStatus[];
	addOrUpdateBook: (book: Book, status?: BookStatus, isFavorite?: boolean) => void;
	removeBook: (bookId: string) => void;
	getBooksByStatus: (status: BookStatus) => BookWithStatus[];
	getFavoriteBooks: () => BookWithStatus[];
	updateBookReview: (bookId: string, review: string, rating: number) => void;
};

// Creating the context with a default value of undefined
const StatusContext = createContext<StatusContextType | undefined>(undefined);

type StatusProviderProps = {
	children: React.ReactNode;
};

// Context provider component
export const StatusProvider = ({ children }: StatusProviderProps) => {
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
						  }
						: b
				);
			} else {
				// Add new book with optional status/favorite
				return [...prevBooks, { ...book, status, isFavorite }];
			}
		});
	};

	// Removes a book from the state completely using its key
	const removeBook = (bookId: string) => {
		setBooks((prevBooks) => prevBooks.filter((book) => book.bookKey !== bookId));
	};

	// Returns all books with a specific reading status (e.g., "reading", "finished")
	const getBooksByStatus = (status: BookStatus) => {
		return books.filter((book) => book.status === status);
	};

	// Returns all books marked as favorites
	const getFavoriteBooks = () => {
		return books.filter((book) => book.isFavorite);
	};

	// Updates the review and rating of a specific book
	const updateBookReview = (bookId: string, review: string, rating: number) => {
		setBooks((prevBooks) =>
			prevBooks.map((book) => (book.bookKey === bookId ? { ...book, review, rating } : book))
		);
	};

	// Provide all functions and state to the component tree
	return (
		<StatusContext.Provider
			value={{
				books,
				addOrUpdateBook,
				removeBook,
				getBooksByStatus,
				getFavoriteBooks,
				updateBookReview,
			}}
		>
			{children}
		</StatusContext.Provider>
	);
};

// Custom hook for accessing the status context safely
export const useStatus = (): StatusContextType => {
	const context = useContext(StatusContext);
	if (!context) {
		throw new Error("useStatus must be used within a StatusProvider");
	}
	return context;
};
