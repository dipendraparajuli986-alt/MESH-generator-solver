import MazeGrid from "./components/MazeGrid";

function App() {
    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Maze Generator & Solver</h1>
                <p className="app-description">

                </p>
            </header>
            <main>
                <MazeGrid />
            </main>
        </div>
    );
}

export default App;