import "./Profile.scss";
import { useLibrary } from "../../contexts/LibraryContext";
import { BookListSection } from "./BookListSection";
import ProfileStats from "./ProfileStats";
import { useAuthor } from "../../contexts/AuthorContext";
import { AuthorResponse } from "../../types";
import { useEffect, useState } from "react";
import AuthorListSection from "./AuthorListSection";

/**
 * Displays user profile with favorite authors and books by reading status.
 * Loads favorite authors asynchronously and handles empty states.
 */

const Profile = () => {
	const { getBooksByStatus, getFavoriteBooks } = useLibrary();
	const { favorites: favoriteAuthorKeys, getAuthor } = useAuthor();

	const [favoriteAuthors, setFavoriteAuthors] = useState<AuthorResponse[]>([]);
	const [loadingAuthors, setLoadingAuthors] = useState(true);

	useEffect(() => {
		const loadAuthors = async () => {
			setLoadingAuthors(true);
			try {
				const authorsData = await Promise.all(
					Array.from(favoriteAuthorKeys).map((key) => getAuthor(key))
				);
				setFavoriteAuthors(authorsData);
			} catch (error) {
				console.error("Failed to load favorite authors", error);
				setFavoriteAuthors([]);
			} finally {
				setLoadingAuthors(false);
			}
		};

		if (favoriteAuthorKeys.size > 0) {
			loadAuthors();
		} else {
			setFavoriteAuthors([]);
			setLoadingAuthors(false);
		}
	}, [favoriteAuthorKeys, getAuthor]);

	const favoriteBooks = getFavoriteBooks();
	const plannedBooks = getBooksByStatus("plan");
	const readingBooks = getBooksByStatus("reading");
	const finishedBooks = getBooksByStatus("finished");

	const isEmpty =
		favoriteBooks.length === 0 &&
		plannedBooks.length === 0 &&
		readingBooks.length === 0 &&
		finishedBooks.length === 0 &&
		favoriteAuthors.length === 0;

	return (
		<div className="profile">
			<h1>My Profile</h1>
			{isEmpty ? (
				<p>You haven't added any books or authors yet. Start exploring!</p>
			) : (
				<>
					<ProfileStats />

					<BookListSection
						title="Favorite Books"
						books={favoriteBooks}
						emptyMessage="No favorite books yet."
					/>

					{loadingAuthors ? (
						<p>Loading favorite authors...</p>
					) : (
						<AuthorListSection
							title="Favorite Authors"
							authors={favoriteAuthors}
							emptyMessage="No favorite authors yet."
						/>
					)}

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
