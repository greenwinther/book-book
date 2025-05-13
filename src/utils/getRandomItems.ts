const getRandomItems = <T>(arr: T[], count: number): T[] => {
	const result: T[] = [];
	const usedIndices = new Set<number>();

	while (result.length < count && usedIndices.size < arr.length) {
		const index = Math.floor(Math.random() * arr.length);
		if (!usedIndices.has(index)) {
			result.push(arr[index]);
			usedIndices.add(index);
		}
	}

	return result;
};

export default getRandomItems;
