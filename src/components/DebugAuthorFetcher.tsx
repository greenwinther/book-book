import { useEffect } from "react";
import fetchAuthorByKey from "../api/fetchAuthorByKey";

const DebugAuthorFetcher = () => {
	useEffect(() => {
		// Try both formats to compare
		fetchAuthorByKey("/authors/OL23919A");
		fetchAuthorByKey("OL23919A");
	}, []);

	return null; // no UI
};

export default DebugAuthorFetcher;
