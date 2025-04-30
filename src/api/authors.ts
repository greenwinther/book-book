export const fetchAuthorName = async (authorKey: string): Promise<string> => {
	try {
		const res = await fetch(`https://openlibrary.org${authorKey}.json`);
		const data = await res.json();
		return data.name;
	} catch (err) {
		console.error(`Failed to fetch author ${authorKey}`, err);
		return "Unknown";
	}
};

export const fetchAuthorNames = async (authors: { author: { key: string } }[]): Promise<string[]> => {
	return Promise.all(authors.map(({ author }) => fetchAuthorName(author.key)));
};
