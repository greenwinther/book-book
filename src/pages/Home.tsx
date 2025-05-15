import DebugAuthorFetcher from "../components/DebugAuthorFetcher";
import RecommendedBooks from "../components/RecommendedBooks/RecommendedBooks";

const Home = () => {
	return (
		<section>
			<DebugAuthorFetcher />
			<RecommendedBooks subject="fantasy" title="Fantasy Picks" />
			<RecommendedBooks subject="horror" title="Horror Picks" />
		</section>
	);
};

export default Home;
