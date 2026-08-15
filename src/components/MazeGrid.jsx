import { useState } from "react";
import { createGrid } from "../utils/mazeUtils";

function MazeGrid(){
    const [grid, setGrid] = useState(() => createGrid(15,30) );

    return (
    <div className="maze-grid">
        {grid.map((row, rowIndex) => (
            <div className="grid-row" key={rowIndex}>
                {row.map((node) => (
                    <div
                        className="grid-cell"
                        key={`${node.row}-${node.col}`}
                    ></div>
                ))}
            </div>
        ))}
    </div>
);

}

export default MazeGrid;
