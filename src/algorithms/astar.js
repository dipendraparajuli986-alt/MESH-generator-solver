export function astar(grid) {
    const steps = [];
    const openSet = [];

    const gScore = new Map();
    const fScore = new Map();
    const previous = new Map();

    const start = grid.flat().find((node) => node.isStart);
    const end = grid.flat().find((node) => node.isEnd);

    if (!start || !end) {
        return { steps, path: [] };
    }

    const key = (node) => `${node.row}-${node.col}`;

    const heuristic = (a, b) =>
        Math.abs(a.row - b.row) +
        Math.abs(a.col - b.col);

    grid.flat().forEach((node) => {
        gScore.set(key(node), Infinity);
        fScore.set(key(node), Infinity);
    });

    gScore.set(key(start), 0);
    fScore.set(key(start), heuristic(start, end));

    openSet.push(start);

    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    while (openSet.length > 0) {
        openSet.sort(
            (a, b) =>
                fScore.get(key(a)) -
                fScore.get(key(b))
        );

        const current = openSet.shift();

        if (
            current.row === end.row &&
            current.col === end.col
        ) {
            break;
        }

        if (!current.isStart) {
            steps.push({
                row: current.row,
                col: current.col,
            });
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

            if (neighbour.isWall) {
                continue;
            }

            const tentativeG =
                gScore.get(key(current)) + 1;

            if (
                tentativeG <
                gScore.get(key(neighbour))
            ) {
                previous.set(
                    key(neighbour),
                    current
                );

                gScore.set(
                    key(neighbour),
                    tentativeG
                );

                fScore.set(
                    key(neighbour),
                    tentativeG +
                        heuristic(neighbour, end)
                );

                if (
                    !openSet.some(
                        (node) =>
                            node.row === neighbour.row &&
                            node.col === neighbour.col
                    )
                ) {
                    openSet.push(neighbour);
                }
            }
        }
    }

    const path = [];
    let current = end;

    while (
        current &&
        !(
            current.row === start.row &&
            current.col === start.col
        )
    ) {
        path.unshift(current);

        current = previous.get(key(current));
    }

    if (current) {
        path.unshift(start);
    }

    return {
        steps,
        path,
    };
}