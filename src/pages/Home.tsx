import RecommendedBooks from "../components/RecommendedBooks/RecommendedBooks";

/**
 * Home page displaying recommended books for a given subject.
 */

const Home = () => {
	return (
		<section>
			<RecommendedBooks subject="fantasy" title="Fantasy Picks" />
		</section>
	);
};

export default Home;
