import "./Profile.scss";
import { useLibrary } from "../../contexts/LibraryContext";
import { BookListSection } from "./BookListSection";
import ProfileStats from "./ProfileStats";

const Profile = () => {
	const { getBooksByStatus, getFavoriteBooks } = useLibrary();

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
					<ProfileStats />
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
						showReview={true}
					/>
				</>
			)}
		</div>
	);
};

export default Profile;
