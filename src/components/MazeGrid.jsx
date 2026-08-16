import { useState } from "react";
import { createGrid } from "../utils/mazeUtils";
import { recursiveBacktracking } from "../generators/recursiveBacktracking";
import { prim } from "../generators/prim";
import { bfs } from "../algorithms/bfs";
import { dfs } from "../algorithms/dfs";
import { dijkstra } from "../algorithms/dijkstra";
import { astar } from "../algorithms/astar";
import Stats from "./Stats";

function MazeGrid() {
    const [grid, setGrid] = useState(() => createGrid(31, 51));
    const [isGenerating, setIsGenerating] = useState(false);
    const [algorithm, setAlgorithm] = useState("backtracking");
    const [isPathfinding, setIsPathfinding] = useState(false);

    const [stats, setStats] = useState({
        algorithm: "",
        time: 0,
        nodesVisited: 0,
        pathLength: 0,
    });

    const [scoreboard, setScoreboard] = useState([]);

    const toggleWall = (row, col) => {
        if (isGenerating || isPathfinding) return;

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
        if (isGenerating || isPathfinding) return;

        setGrid(createGrid(31, 51));
    };

    const generateMaze = () => {
        if (isGenerating || isPathfinding) return;

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
                isPath: false,
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

    const clearPathfinding = () => {
        setGrid((currentGrid) =>
            currentGrid.map((row) =>
                row.map((node) => ({
                    ...node,
                    isVisited: false,
                    isPath: false,
                }))
            )
        );
    };

    const animatePathfinding = (result) => {
        let stepIndex = 0;

        const interval = setInterval(() => {
            if (stepIndex >= result.steps.length) {
                clearInterval(interval);

                let pathIndex = 0;

                const pathInterval = setInterval(() => {
                    if (pathIndex >= result.path.length) {
                        clearInterval(pathInterval);
                        setIsPathfinding(false);
                        return;
                    }

                    const pathNode = result.path[pathIndex];

                    setGrid((currentGrid) =>
                        currentGrid.map((row) =>
                            row.map((node) =>
                                node.row === pathNode.row &&
                                node.col === pathNode.col
                                    ? {
                                          ...node,
                                          isPath: true,
                                      }
                                    : node
                            )
                        )
                    );

                    pathIndex++;
                }, 40);

                return;
            }

            const step = result.steps[stepIndex];

            setGrid((currentGrid) =>
                currentGrid.map((row) =>
                    row.map((node) =>
                        node.row === step.row &&
                        node.col === step.col
                            ? {
                                  ...node,
                                  isVisited: true,
                              }
                            : node
                    )
                )
            );

            stepIndex++;
        }, 20);
    };

    const runBFS = () => {
        if (isGenerating || isPathfinding) return;

        clearPathfinding();

        setTimeout(() => {
            setIsPathfinding(true);

            const cleanGrid = grid.map((row) =>
                row.map((node) => ({
                    ...node,
                    isVisited: false,
                    isPath: false,
                }))
            );

            const startTime = performance.now();

const result = bfs(cleanGrid);

const endTime = performance.now();

setStats({
    algorithm: "BFS",
    time: endTime - startTime,
    nodesVisited: result.steps.length,
    pathLength: result.path.length,
});

setScoreboard((current) => [
    ...current,
    {
        algorithm: "BFS",
        time: endTime - startTime,
        nodesVisited: result.steps.length,
        pathLength: result.path.length,
    },
]);

animatePathfinding(result);
        }, 50);
    };

    const runDFS = () => {
        if (isGenerating || isPathfinding) return;

        clearPathfinding();

        setTimeout(() => {
            setIsPathfinding(true);

            const cleanGrid = grid.map((row) =>
                row.map((node) => ({
                    ...node,
                    isVisited: false,
                    isPath: false,
                }))
            );

            const startTime = performance.now();

const result = dfs(cleanGrid);

const endTime = performance.now();

setStats({
    algorithm: "DFS",
    time: endTime - startTime,
    nodesVisited: result.steps.length,
    pathLength: result.path.length,
});

setScoreboard((current) => [
    ...current,
    {
        algorithm: "DFS",
        time: endTime - startTime,
        nodesVisited: result.steps.length,
        pathLength: result.path.length,
    },
]);

animatePathfinding(result);
        }, 50);
    };

    
    const runDijkstra = () => {
        if (isGenerating || isPathfinding) return;

        clearPathfinding();

        setTimeout(() => {
            setIsPathfinding(true);

            const cleanGrid = grid.map((row) =>
                row.map((node) => ({
                    ...node,
                    isVisited: false,
                    isPath: false,
                }))
            );

           const startTime = performance.now();

const result = dijkstra(cleanGrid);

const endTime = performance.now();

setStats({
    algorithm: "Dijkstra",
    time: endTime - startTime,
    nodesVisited: result.steps.length,
    pathLength: result.path.length,
});

setScoreboard((current) => [
    ...current,
    {
        algorithm: "Dijkstra",
        time: endTime - startTime,
        nodesVisited: result.steps.length,
        pathLength: result.path.length,
    },
]);

animatePathfinding(result);
        }, 50);
    };

    
    const runAStar = () => {
        if (isGenerating || isPathfinding) return;

        clearPathfinding();

        setTimeout(() => {
            setIsPathfinding(true);

            const cleanGrid = grid.map((row) =>
                row.map((node) => ({
                    ...node,
                    isVisited: false,
                    isPath: false,
                }))
            );

            const startTime = performance.now();

const result = astar(cleanGrid);

const endTime = performance.now();

setStats({
    algorithm: "A*",
    time: endTime - startTime,
    nodesVisited: result.steps.length,
    pathLength: result.path.length,
});

setScoreboard((current) => [
    ...current,
    {
        algorithm: "A*",
        time: endTime - startTime,
        nodesVisited: result.steps.length,
        pathLength: result.path.length,
    },
]);

animatePathfinding(result);
        }, 50);
    };

    return (
        <div>
            <div className="controls">
                <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    disabled={isGenerating || isPathfinding}
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
                    disabled={isGenerating || isPathfinding}
                >
                    {isGenerating
                        ? "Generating..."
                        : "Generate Maze"}
                </button>

                <button
                    onClick={resetGrid}
                    disabled={isGenerating || isPathfinding}
                >
                    Reset
                </button>

                <button
                    onClick={runBFS}
                    disabled={isGenerating || isPathfinding}
                >
                    Run BFS
                </button>

                <button
                    onClick={runDFS}
                    disabled={isGenerating || isPathfinding}
                >
                    Run DFS
                </button>

                <button
                    onClick={runDijkstra}
                    disabled={isGenerating || isPathfinding}
                >
                    Run Dijkstra
                </button>

                <button
                    onClick={runAStar}
                    disabled={isGenerating || isPathfinding}
                >
                    Run A*
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
                                        : node.isPath
                                        ? "path"
                                        : node.isVisited
                                        ? "visited"
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
            </div> <Stats stats={stats} scoreboard={scoreboard} />
        </div>
    );
}

export default MazeGrid;