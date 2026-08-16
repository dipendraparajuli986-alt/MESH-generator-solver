import { useState } from "react";
import { createGrid } from "../utils/mazeUtils";
import { recursiveBacktracking } from "../generators/recursiveBacktracking";
import { prim } from "../generators/prim";

function MazeGrid() {
    const [grid, setGrid] = useState(() => createGrid(31, 51));
    const [isGenerating, setIsGenerating] = useState(false);
    const [algorithm, setAlgorithm] = useState("backtracking");

    const toggleWall = (row, col) => {
        if (isGenerating) return;

        setGrid((currentGrid) =>
            currentGrid.map((currentRow) =>
                currentRow.map((node) => {
                    if (
                        node.row === row &&
                        node.col === col &&
                        !node.isStart &&
                        !node.isEnd
                    ) {
                        return {
                            ...node,
                            isWall: !node.isWall,
                        };
                    }

                    return node;
                })
            )
        );
    };

    const resetGrid = () => {
        if (isGenerating) return;

        setGrid(createGrid(31, 51));
    };

    const generateMaze = () => {
        if (isGenerating) return;

        setIsGenerating(true);

        const freshGrid = createGrid(31, 51);

        const result =
            algorithm === "backtracking"
                ? recursiveBacktracking(freshGrid)
                : prim(freshGrid);

        let currentGrid = freshGrid.map((row) =>
            row.map((node) => ({
                ...node,
                isWall: true,
                isVisited: false,
            }))
        );

        setGrid(currentGrid);

        let stepIndex = 0;

        const interval = setInterval(() => {
            if (stepIndex >= result.steps.length) {
                clearInterval(interval);
                setGrid(result.grid);
                setIsGenerating(false);
                return;
            }

            const step = result.steps[stepIndex];

            currentGrid = currentGrid.map((row) =>
                row.map((node) => {
                    if (
                        node.row === step.row &&
                        node.col === step.col
                    ) {
                        return {
                            ...node,
                            isWall: false,
                        };
                    }

                    return node;
                })
            );

            setGrid(currentGrid);
            stepIndex++;
        }, 20);
    };

    return (
        <div>
            <div className="controls">
                <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    disabled={isGenerating}
                >
                    <option value="backtracking">
                        Recursive Backtracking
                    </option>

                    <option value="prim">
                        Prim's Algorithm
                    </option>
                </select>

                <button
                    onClick={generateMaze}
                    disabled={isGenerating}
                >
                    {isGenerating
                        ? "Generating..."
                        : "Generate Maze"}
                </button>

                <button
                    onClick={resetGrid}
                    disabled={isGenerating}
                >
                    Reset
                </button>
            </div>

            <div className="maze-grid">
                {grid.map((row, rowIndex) => (
                    <div
                        className="grid-row"
                        key={rowIndex}
                    >
                        {row.map((node) => (
                            <div
                                className={`grid-cell ${
                                    node.isStart
                                        ? "start"
                                        : node.isEnd
                                        ? "end"
                                        : node.isWall
                                        ? "wall"
                                        : ""
                                }`}
                                key={`${node.row}-${node.col}`}
                                onClick={() =>
                                    toggleWall(
                                        node.row,
                                        node.col
                                    )
                                }
                            >
                                {node.isStart && "S"}
                                {node.isEnd && "E"}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MazeGrid;