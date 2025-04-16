// ReadBooksContext will manage the books that the user has marked as read or in progress.

// src/contexts/ReadBooksContext.tsx

import React, { createContext, useContext, useState } from "react";
import { ReadBook } from "../types";

// The shape of our context
interface ReadBooksContextType {
	readBooks: ReadBook[];
	addReadBook: (bookId: ReadBook) => void;
	updateReadBookStatus: (bookId: string, status: "reading" | "finished" | "plan") => void;
}

// Create the context with default values
const ReadBooksContext = createContext<ReadBooksContextType | undefined>(undefined);

type ReadBooksProviderProps = {
	children: React.ReactNode;
};

// The provider component that will wrap the app
export const ReadBooksProvider = ({ children }: ReadBooksProviderProps) => {
	const [readBooks, setReadBooks] = useState<ReadBook[]>([]);

	// Add a new read book
	const addReadBook = (book: ReadBook) => {
		setReadBooks((prevReadBooks) => [...prevReadBooks, book]);
	};

	// Update the reading status of a book (e.g. from 'reading' to 'finished')
	const updateReadBookStatus = (bookId: string, status: "reading" | "finished" | "plan") => {
		setReadBooks((prevReadBooks) =>
			prevReadBooks.map((book) => (book.key === bookId ? { ...book, status } : book))
		);
	};

	return (
		<ReadBooksContext.Provider value={{ readBooks, addReadBook, updateReadBookStatus }}>
			{children}
		</ReadBooksContext.Provider>
	);
};

// Custom hook to use the ReadBooks context
export const useReadBooks = (): ReadBooksContextType => {
	const context = useContext(ReadBooksContext);
	if (!context) {
		throw new Error("useReadBooks must be used within a ReadBooksProvider");
	}
	return context;
};
