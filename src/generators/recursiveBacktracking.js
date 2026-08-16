export function recursiveBacktracking(grid) {
    const steps = [];

    const rows = grid.length;
    const cols = grid[0].length;

    const newGrid = grid.map((row) =>
        row.map((node) => ({
            ...node,
            isWall: true,
            isVisited: false,
        }))
    );

    // Use the application's actual start node
    const startNode = grid
        .flat()
        .find((node) => node.isStart);

    const startRow = startNode ? startNode.row : 1;
    const startCol = startNode ? startNode.col : 1;

    function carve(row, col) {
        newGrid[row][col].isWall = false;
        newGrid[row][col].isVisited = true;

        steps.push({
            type: "visit",
            row,
            col,
        });

        const directions = [
            [-2, 0],
            [2, 0],
            [0, -2],
            [0, 2],
        ];

        directions.sort(() => Math.random() - 0.5);

        for (const [rowChange, colChange] of directions) {
            const newRow = row + rowChange;
            const newCol = col + colChange;

            if (
                newRow <= 0 ||
                newRow >= rows - 1 ||
                newCol <= 0 ||
                newCol >= cols - 1
            ) {
                continue;
            }

            if (newGrid[newRow][newCol].isVisited) {
                continue;
            }

            const wallRow = row + rowChange / 2;
            const wallCol = col + colChange / 2;

            newGrid[wallRow][wallCol].isWall = false;

            steps.push({
                type: "removeWall",
                row: wallRow,
                col: wallCol,
            });

            carve(newRow, newCol);
        }
    }

    carve(startRow, startCol);

    return {
        grid: newGrid,
        steps,
    };
}