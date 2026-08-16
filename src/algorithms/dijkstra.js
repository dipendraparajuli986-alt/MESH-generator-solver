export function dijkstra(grid) {
    const steps = [];
    const distances = new Map();
    const previous = new Map();
    const unvisited = [];

    const start = grid.flat().find((node) => node.isStart);
    const end = grid.flat().find((node) => node.isEnd);

    if (!start || !end) {
        return { steps, path: [] };
    }

    grid.flat().forEach((node) => {
        distances.set(`${node.row}-${node.col}`, Infinity);
        unvisited.push(node);
    });

    distances.set(`${start.row}-${start.col}`, 0);

    while (unvisited.length > 0) {
        unvisited.sort(
            (a, b) =>
                distances.get(`${a.row}-${a.col}`) -
                distances.get(`${b.row}-${b.col}`)
        );

        const current = unvisited.shift();

        if (
            distances.get(`${current.row}-${current.col}`) ===
            Infinity
        ) {
            break;
        }

        if (current.isWall) {
            continue;
        }

        if (
            current.row !== start.row ||
            current.col !== start.col
        ) {
            steps.push({
                row: current.row,
                col: current.col,
            });
        }

        if (
            current.row === end.row &&
            current.col === end.col
        ) {
            break;
        }

        const directions = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
        ];

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

            const currentKey = `${current.row}-${current.col}`;
            const neighbourKey = `${row}-${col}`;

            const newDistance =
                distances.get(currentKey) + 1;

            if (
                newDistance <
                distances.get(neighbourKey)
            ) {
                distances.set(
                    neighbourKey,
                    newDistance
                );

                previous.set(
                    neighbourKey,
                    current
                );
            }
        }
    }

    const path = [];

    let current = end;

    while (
        current &&
        !(current.row === start.row &&
          current.col === start.col)
    ) {
        path.unshift(current);

        current = previous.get(
            `${current.row}-${current.col}`
        );
    }

    if (current) {
        path.unshift(start);
    }

    return {
        steps,
        path,
    };
}