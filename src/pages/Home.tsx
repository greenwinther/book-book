import RecommendedBooks from "../components/RecommendedBooks/RecommendedBooks";

const Home = () => {
	return (
		<section>
			<RecommendedBooks subject="fantasy" title="Fantasy Picks" />
			<RecommendedBooks subject="horror" title="Horror Picks" />
		</section>
	);
};

export default Home;
