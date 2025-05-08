type Props = {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput = ({ value, onChange }: Props) => (
	<input
		type="text"
		value={value}
		onChange={onChange}
		placeholder="Search books..."
		className="search-input"
	/>
);

export default SearchInput;
