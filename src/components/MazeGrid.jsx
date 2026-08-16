import { useState } from "react";
import { createGrid } from "../utils/mazeUtils";

function MazeGrid(){
    const [grid, setGrid] = useState(() => createGrid(60,50) );

    const toggleWall = (row, col) => {
    setGrid((currentGrid) => {
        const newGrid = currentGrid.map((currentRow) =>
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
        );

        return newGrid;
    });
};

    return (
    <div className="maze-grid">
        {grid.map((row, rowIndex) => (
            <div className="grid-row" key={rowIndex}>
                {row.map((node) => (
                    <div
                        className={`grid-cell ${
                        node.isWall
                        ? "wall"
                        : node.isStart
                        ? "start"
                        : node.isEnd
                        ? "end"
                        : ""
                        }`}
                        key={`${node.row}-${node.col}`}
                        onClick={() => toggleWall(node.row, node.col)}
                    ></div>
                ))}
            </div>
        ))}
    </div>
);

}

export default MazeGrid;
