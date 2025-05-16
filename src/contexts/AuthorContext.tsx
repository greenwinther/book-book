import { createContext, useContext, useState } from "react";
import { AuthorResponse } from "../types";
import fetchAuthorByKey from "../api/fetchAuthorByKey";

/**
 * AuthorContext provides author data and favorite author management.
 * - authors: cached map of author keys to author data
 * - favorites: set of favorite author keys
 * - getAuthor: fetches author data by key, caching results
 * - toggleFavoriteAuthor: adds/removes author key from favorites
 * - isFavoriteAuthor: checks if author key is in favorites
 *
 * AuthorProvider wraps components to provide author context.
 * useAuthor hook accesses the context, throwing if used outside provider.
 */

type AuthorMap = Record<string, AuthorResponse>;

type AuthorContextType = {
	authors: AuthorMap;
	favorites: Set<string>;
	getAuthor: (key: string) => Promise<AuthorResponse>;
	toggleFavoriteAuthor: (key: string) => void;
	isFavoriteAuthor: (key: string) => boolean;
};

const AuthorContext = createContext<AuthorContextType | undefined>(undefined);

export const AuthorProvider = ({ children }: { children: React.ReactNode }) => {
	const [authors, setAuthors] = useState<AuthorMap>({});
	const [favorites, setFavorites] = useState<Set<string>>(new Set());

	const getAuthor = async (key: string): Promise<AuthorResponse> => {
		if (authors[key]) return authors[key];

		const data = await fetchAuthorByKey(key);
		setAuthors((prev) => ({ ...prev, [key]: data }));
		return data;
	};

	const toggleFavoriteAuthor = (key: string) => {
		setFavorites((prev) => {
			const newFavorites = new Set(prev);
			if (newFavorites.has(key)) {
				newFavorites.delete(key);
			} else {
				newFavorites.add(key);
			}
			return newFavorites;
		});
	};

	const isFavoriteAuthor = (key: string) => favorites.has(key);

	return (
		<AuthorContext.Provider
			value={{ authors, getAuthor, favorites, toggleFavoriteAuthor, isFavoriteAuthor }}
		>
			{children}
		</AuthorContext.Provider>
	);
};

export const useAuthor = (): AuthorContextType => {
	const context = useContext(AuthorContext);
	if (!context) throw new Error("useAuthor must be used within an AuthorProvider");
	return context;
};
