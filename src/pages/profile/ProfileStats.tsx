import { useLibrary } from "../../contexts/LibraryContext";

const ProfileStats = () => {
	const { getBooksByStatus, getPagesRead } = useLibrary();

	const finished = getBooksByStatus("finished").length;
	const reading = getBooksByStatus("reading").length;
	const unread = getBooksByStatus("plan").length;
	const pagesRead = getPagesRead();

	return (
		<div className="profile-stats">
			<h2>📚 Your Reading Stats</h2>
			<ul>
				<li>
					<strong>Finished Books:</strong> {finished}
				</li>
				<li>
					<strong>Currently Reading:</strong> {reading}
				</li>
				<li>
					<strong>Plan to read:</strong> {unread}
				</li>
				<li>
					<strong>Pages Read:</strong> {pagesRead}
				</li>
			</ul>
		</div>
	);
};

export default ProfileStats;
