export function dfs(grid) {
    const steps = [];
    const visited = new Set();
    const previous = new Map();

    const start = grid.flat().find((node) => node.isStart);
    const end = grid.flat().find((node) => node.isEnd);

    if (!start || !end) {
        return { steps, path: [] };
    }

    const stack = [start];
    visited.add(`${start.row}-${start.col}`);

    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    while (stack.length > 0) {
        const current = stack.pop();

        if (
            current.row === end.row &&
            current.col === end.col
        ) {
            break;
        }

        for (const [dr, dc] of directions) {
            const row = current.row + dr;
            const col = current.col + dc;

            if (
                row < 0 ||
                row >= grid.length ||
                col < 0 ||
                col >= grid[0].length
            ) {
                continue;
            }

            const neighbour = grid[row][col];
            const key = `${row}-${col}`;

            if (neighbour.isWall || visited.has(key)) {
                continue;
            }

            visited.add(key);
            previous.set(key, current);
            stack.push(neighbour);

            steps.push({
                type: "visit",
                row,
                col,
            });
        }
    }

    const path = [];
    let current = end;

    while (
        current &&
        !(current.row === start.row && current.col === start.col)
    ) {
        path.unshift(current);

        current = previous.get(
            `${current.row}-${current.col}`
        );
    }

    if (current) {
        path.unshift(start);
    }

    return { steps, path };
}