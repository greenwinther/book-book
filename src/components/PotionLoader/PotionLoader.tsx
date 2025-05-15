import "./PotionLoader.scss";

type PotionLoaderProps = {
	title?: string;
};

const PotionLoader = ({ title }: PotionLoaderProps) => {
	return (
		<div className="potion-loader" role="status" aria-label="Loading...">
			<img
				src="/src/assets/potion-loader.gif"
				alt="Magical potion bubbling while loading"
				className="potion-image"
			/>
			<p className="loading-text">{title}</p>
		</div>
	);
};

export default PotionLoader;
