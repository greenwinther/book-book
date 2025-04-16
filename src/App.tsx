import "./App.scss";
import { FavoritesProvider } from "./contexts/FavoritesContext.tsx";
import { ReadBooksProvider } from "./contexts/ReadBooksContext.tsx";

function App() {
	return (
		<>
			<FavoritesProvider>
				<ReadBooksProvider>
					{/* Your main application component goes here */}
					<div className="app">
						<h1>Book Tracker</h1>
						{/* Other components can be added here */}
					</div>
				</ReadBooksProvider>
			</FavoritesProvider>
		</>
	);
}

export default App;
