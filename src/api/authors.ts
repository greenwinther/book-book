const fetchAuthorName = async (authorKey: string): Promise<string> => {
	try {
		const response = await fetch(`https://openlibrary.org${authorKey}.json`);
		const data = await response.json();
		return data.name;
	} catch (err) {
		console.error(`Failed to fetch author ${authorKey}`, err);
		return "Unknown";
	}
};

export const fetchAuthorNames = async (authors: { author: { key: string } }[]): Promise<string[]> =>
	Promise.all(authors.map(({ author }) => fetchAuthorName(author.key)));
