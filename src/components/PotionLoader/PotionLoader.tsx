import "./PotionLoader.scss";

const PotionLoader = () => {
	return (
		<div className="potion-loader" role="status" aria-label="Loading...">
			<img
				src="/src/assets/potion-loader.gif"
				alt="Magical potion bubbling while loading"
				className="potion-image"
			/>
			<p className="loading-text">Brewing up some books...</p>
		</div>
	);
};

export default PotionLoader;
