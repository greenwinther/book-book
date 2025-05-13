// src/api/bookPages.ts
export const fetchPages = async (workKey: string): Promise<number | null> => {
	try {
		const editionsRes = await fetch(`https://openlibrary.org/works/${workKey}/editions.json?limit=1`);
		const editionsData = await editionsRes.json();

		const firstEdition = editionsData.entries?.[0];

		if (!firstEdition || !firstEdition.key) return null;

		const editionRes = await fetch(`https://openlibrary.org${firstEdition.key}.json`);
		const editionData = await editionRes.json();

		return editionData.number_of_pages ?? null;
	} catch (err) {
		console.error("Failed to fetch page count:", err);
		return null;
	}
};
