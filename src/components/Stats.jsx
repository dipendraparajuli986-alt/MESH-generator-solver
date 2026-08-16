import { quickSort } from "../sorting/quickSort";

function Stats({ stats, scoreboard, liveStats }) {
    const sortedScoreboard = quickSort(scoreboard);

    return (
        <div className="stats">

            {/* Live solving information */}
            {liveStats.status === "solving" && (
                <div className="live-stats">
                    <h2> Attempting </h2>

                    <p>
                        <strong>Elapsed:</strong>{" "}
                        {(liveStats.elapsed / 1000).toFixed(2)} s
                    </p>

                    <p>
                        <strong>Nodes Visited:</strong>{" "}
                        {liveStats.nodesVisited}
                    </p>
                </div>
            )}

            {/* Completed status */}
            {liveStats.status === "completed" && (
                <div className="live-stats">
                    <h2>Performed</h2>
                </div>
            )}

            {/* Current run */}
            <h2>Current Run</h2>

            <p>
                <strong>Algorithm:</strong>{" "}
                {stats.algorithm || "—"}
            </p>

            <p>
                <strong>Execution Time:</strong>{" "}
                {stats.time.toFixed(3)} ms
            </p>

            <p>
                <strong>Nodes Visited:</strong>{" "}
                {stats.nodesVisited}
            </p>

            <p>
                <strong>Path Length:</strong>{" "}
                {stats.pathLength}
            </p>

            {/* Performance scoreboard */}
            {scoreboard.length > 0 && (
                <>
                    <h2>Performance Board</h2>

                    <table className="scoreboard">
                        <thead>
                            <tr>
                                <th>Algorithm</th>
                                <th>Time (ms)</th>
                                <th>Visited</th>
                                <th>Path</th>
                            </tr>
                        </thead>

                        <tbody>
                            {sortedScoreboard.map((run, index) => (
                                <tr key={index}>
                                    <td>{run.algorithm}</td>
                                    <td>{run.time.toFixed(3)}</td>
                                    <td>{run.nodesVisited}</td>
                                    <td>{run.pathLength}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

        </div>
    );
}

export default Stats;