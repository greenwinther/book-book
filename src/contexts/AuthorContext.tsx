import { createContext, useContext, useState } from "react";
import { AuthorResponse } from "../types";
import fetchAuthorByKey from "../api/fetchAuthorByKey";

type AuthorMap = Record<string, AuthorResponse>;

type AuthorContextType = {
	authors: AuthorMap;
	getAuthor: (key: string) => Promise<AuthorResponse>;
};

const AuthorContext = createContext<AuthorContextType | undefined>(undefined);

export const AuthorProvider = ({ children }: { children: React.ReactNode }) => {
	const [authors, setAuthors] = useState<AuthorMap>({});

	const getAuthor = async (key: string): Promise<AuthorResponse> => {
		if (authors[key]) return authors[key];

		const data = await fetchAuthorByKey(key);
		setAuthors((prev) => ({ ...prev, [key]: data }));
		return data;
	};

	return <AuthorContext.Provider value={{ authors, getAuthor }}>{children}</AuthorContext.Provider>;
};

export const useAuthor = (): AuthorContextType => {
	const context = useContext(AuthorContext);
	if (!context) throw new Error("useAuthor must be used within an AuthorProvider");
	return context;
};
