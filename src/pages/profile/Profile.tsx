import { useStatus } from "../../contexts/StatusContext";
import { BookListSection } from "./BookListSection";
import "./Profile.scss";

const Profile = () => {
	const { getBooksByStatus, getFavoriteBooks } = useStatus();

	const favoriteBooks = getFavoriteBooks();
	const plannedBooks = getBooksByStatus("plan");
	const readingBooks = getBooksByStatus("reading");
	const finishedBooks = getBooksByStatus("finished");

	const isEmpty =
		favoriteBooks.length === 0 &&
		plannedBooks.length === 0 &&
		readingBooks.length === 0 &&
		finishedBooks.length === 0;

	return (
		<div className="profile">
			<h1>My Profile</h1>
			{isEmpty ? (
				<p>You haven't added any books yet. Start by exploring the library!</p>
			) : (
				<>
					<BookListSection
						title="Favorites"
						books={favoriteBooks}
						emptyMessage="No favorite books yet."
					/>

					<BookListSection
						title="Planned to Read"
						books={plannedBooks}
						emptyMessage="No books in planning yet."
					/>

					<BookListSection
						title="Currently Reading"
						books={readingBooks}
						emptyMessage="You're not reading anything at the moment."
					/>

					<BookListSection
						title="Finished Books"
						books={finishedBooks}
						emptyMessage="No finished books yet."
					/>
				</>
			)}
		</div>
	);
};

export default Profile;
