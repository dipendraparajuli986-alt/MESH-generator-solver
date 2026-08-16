export function prim(grid) {
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

    const startNode = grid
        .flat()
        .find((node) => node.isStart);

    const startRow = startNode ? startNode.row : 1;
    const startCol = startNode ? startNode.col : 1;

    const frontier = [];

    function addFrontier(row, col) {
        const directions = [
            [-2, 0],
            [2, 0],
            [0, -2],
            [0, 2],
        ];

        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (
                newRow > 0 &&
                newRow < rows - 1 &&
                newCol > 0 &&
                newCol < cols - 1 &&
                !newGrid[newRow][newCol].isVisited
            ) {
                frontier.push([newRow, newCol]);
            }
        }
    }

    newGrid[startRow][startCol].isWall = false;
    newGrid[startRow][startCol].isVisited = true;

    steps.push({
        type: "visit",
        row: startRow,
        col: startCol,
    });

    addFrontier(startRow, startCol);

    while (frontier.length > 0) {
        const randomIndex = Math.floor(
            Math.random() * frontier.length
        );

        const [row, col] = frontier.splice(randomIndex, 1)[0];

        if (newGrid[row][col].isVisited) {
            continue;
        }

        const visitedNeighbours = [];

        const directions = [
            [-2, 0],
            [2, 0],
            [0, -2],
            [0, 2],
        ];

        for (const [dr, dc] of directions) {
            const neighbourRow = row + dr;
            const neighbourCol = col + dc;

            if (
                neighbourRow > 0 &&
                neighbourRow < rows - 1 &&
                neighbourCol > 0 &&
                neighbourCol < cols - 1 &&
                newGrid[neighbourRow][neighbourCol].isVisited
            ) {
                visitedNeighbours.push([
                    neighbourRow,
                    neighbourCol,
                ]);
            }
        }

        if (visitedNeighbours.length === 0) {
            continue;
        }

        const [
            neighbourRow,
            neighbourCol,
        ] =
            visitedNeighbours[
                Math.floor(
                    Math.random() * visitedNeighbours.length
                )
            ];

        const wallRow = (row + neighbourRow) / 2;
        const wallCol = (col + neighbourCol) / 2;

        newGrid[row][col].isWall = false;
        newGrid[row][col].isVisited = true;

        newGrid[wallRow][wallCol].isWall = false;

        steps.push({
            type: "removeWall",
            row: wallRow,
            col: wallCol,
        });

        steps.push({
            type: "visit",
            row,
            col,
        });

        addFrontier(row, col);
    }

    const endNode = grid
        .flat()
        .find((node) => node.isEnd);

    if (endNode) {
        newGrid[endNode.row][endNode.col].isWall = false;

        steps.push({
            type: "visit",
            row: endNode.row,
            col: endNode.col,
        });
    }

    return {
        grid: newGrid,
        steps,
    };
}