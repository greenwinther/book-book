// FavoritesContext will manage the user's favorite books.

import React, { createContext, useContext, useState } from "react";
import { FavoriteBook } from "../types";

// The shape of our context
interface FavoritesContextType {
	favorites: FavoriteBook[];
	addToFavorites: (bookId: FavoriteBook) => void;
	removeFromFavorites: (bookId: string) => void;
}

// Create the context with default values
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

type FavoritesProviderProps = {
	children: React.ReactNode;
};

// The provider component that will wrap the app
export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
	// State to store favorite books
	const [favorites, setFavorites] = useState<FavoriteBook[]>([]);

	// Add a book to favorites
	const addToFavorites = (book: FavoriteBook) => {
		setFavorites((prevFavorites) => [...prevFavorites, book]);
	};

	// Remove a book from favorites by its key
	const removeFromFavorites = (bookId: string) => {
		setFavorites((prevFavorites) => prevFavorites.filter((book) => book.key !== bookId));
	};

	return (
		<FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
			{children}
		</FavoritesContext.Provider>
	);
};

// Custom hook to use the Favorites context
export const useFavorites = (): FavoritesContextType => {
	const context = useContext(FavoritesContext);
	if (!context) {
		throw new Error("useFavorites must be used within a FavoritesProvider");
	}
	return context;
};
