/**
 * Returns a random subset of unique items from an array, up to the specified count.
 * Ensures no duplicates by tracking used indices.
 */

const getRandomItems = <T>(arr: T[], count: number): T[] => {
	const shuffled = [...arr];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled.slice(0, count);
};

export default getRandomItems;
