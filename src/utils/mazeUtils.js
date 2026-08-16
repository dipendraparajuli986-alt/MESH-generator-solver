export function createNode(row, col) {
    return {
        row,
        col,
        isWall: true,
        isStart: false,
        isEnd: false,
        isVisited: false,
        visitedBy: null,
        pathBy: null,
    };
}

export function createGrid(rows, cols) {
    const grid = [];

    for (let row = 0; row < rows; row++) {
        const currentRow = [];

        for (let col = 0; col < cols; col++) {
            currentRow.push(createNode(row, col));
        }

        grid.push(currentRow);
    }

    // Start and end positions
    let startRow = Math.floor(rows / 2);

    if (startRow % 2 === 0) {
        startRow--;
    }

    const startCol = 1;

    let endRow = startRow;
    let endCol = cols - 2;

    if (endCol % 2 === 0) {
        endCol--;
    }

    grid[startRow][startCol].isStart = true;
    grid[endRow][endCol].isEnd = true;

    return grid;
}

export function getNeighbours(grid, row, col) {
    const neighbours = [];

    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    for (const [rowChange, colChange] of directions) {
        const newRow = row + rowChange;
        const newCol = col + colChange;

        if (
            newRow >= 0 &&
            newRow < grid.length &&
            newCol >= 0 &&
            newCol < grid[0].length
        ) {
            neighbours.push(grid[newRow][newCol]);
        }
    }

    return neighbours;
}