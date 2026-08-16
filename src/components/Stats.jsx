function Stats({ stats, scoreboard }) {
    return (
        <div className="stats">

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
                            {scoreboard.map((run, index) => (
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