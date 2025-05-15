import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import fetchAuthorByKey from "../../api/fetchAuthorByKey";
import fetchAuthorPhoto from "../../api/fetchAuthorPhoto";
import PotionLoader from "../../components/PotionLoader/PotionLoader";
import { AuthorResponse } from "../../types";

const AuthorDetails = () => {
	const { authorKey } = useParams<{ authorKey: string }>();
	const [author, setAuthor] = useState<AuthorResponse | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadAuthor = async () => {
			if (!authorKey) return;
			const fetched = await fetchAuthorByKey(authorKey);
			setAuthor(fetched);
			setLoading(false);
		};
		loadAuthor();
	}, [authorKey]);

	if (loading) return <PotionLoader title={"Summoning the author..."} />;
	if (!author) return <p>Author not found.</p>;

	const photoUrl = fetchAuthorPhoto(author.photos, "L");

	return (
		<div className="author-details">
			<div className="details-top-section">
				<div className="details-cover">
					{photoUrl && <img src={photoUrl} alt={`Portrait of ${author.name}`} />}
				</div>
				<div className="details-info">
					<h1>{author.name}</h1>
					{author.fuller_name && <p className="author">{author.fuller_name}</p>}
					<div className="description">
						{typeof author.bio === "string" ? (
							<ReactMarkdown>{author.bio}</ReactMarkdown>
						) : author.bio?.value ? (
							<ReactMarkdown>{author.bio.value}</ReactMarkdown>
						) : (
							<p>No bio available.</p>
						)}
					</div>
				</div>
			</div>

			<div className="details-middle-section">
				<p>
					<strong>Born:</strong> {author.birth_date ?? "Unknown"}
				</p>
				{author.death_date && (
					<p>
						<strong>Died:</strong> {author.death_date}
					</p>
				)}
			</div>
		</div>
	);
};

export default AuthorDetails;
