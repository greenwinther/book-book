export const fetchAverageRating = async (bookKey: string): Promise<number | null> => {
	try {
		const response = await fetch(`https://openlibrary.org${bookKey}/ratings.json`);
		if (!response.ok) throw new Error("Failed to fetch rating");

		const data = await response.json();
		return data?.summary?.average ?? null;
	} catch (error) {
		console.error(`Error fetching rating for bookKey ${bookKey}:`, error);
		return null;
	}
};
