import { quickSort } from "../sorting/quickSort";

function Stats({ stats, scoreboard, liveStats }) {
    const sortedScoreboard = quickSort(scoreboard);

    return (
        <div className="stats-section">
            {/* Live solving information */}
            {liveStats.status === "solving" && (
                <div className="live-status-banner">
                    <span className="live-indicator">●</span>
                    <span className="live-text">Solving in progress...</span>
                    <div className="live-metrics">
                        <span><strong>Time:</strong> {(liveStats.elapsed / 1000).toFixed(2)}s</span>
                        <span><strong>Visited:</strong> {liveStats.nodesVisited} nodes</span>
                    </div>
                </div>
            )}

            {liveStats.status === "completed" && (
                <div className="live-status-banner completed">
                    ✓ Pathfinding completed successfully!
                </div>
            )}

            <div className="stats-cards-grid">
                {/* Current run metrics */}
                <div className="stats-card">
                    <h3 className="card-title">Last Execution Metrics</h3>
                    <div className="metrics-grid">
                        <div className="metric-box">
                            <span className="metric-label">Algorithm</span>
                            <span className="metric-value">{stats.algorithm || "—"}</span>
                        </div>
                        <div className="metric-box">
                            <span className="metric-label">Execution Time</span>
                            <span className="metric-value">{stats.time ? `${stats.time.toFixed(2)} ms` : "—"}</span>
                        </div>
                        <div className="metric-box">
                            <span className="metric-label">Nodes Visited</span>
                            <span className="metric-value">{stats.nodesVisited || "—"}</span>
                        </div>
                        <div className="metric-box">
                            <span className="metric-label">Path Length</span>
                            <span className="metric-value">{stats.pathLength || "—"}</span>
                        </div>
                    </div>
                </div>

                {/* Performance scoreboard */}
                {scoreboard.length > 0 && (
                    <div className="stats-card">
                        <h3 className="card-title">Performance Comparison</h3>
                        <div className="table-responsive">
                            <table className="scoreboard-table">
                                <thead>
                                    <tr>
                                        <th>Algorithm</th>
                                        <th>Time (ms)</th>
                                        <th>Visited</th>
                                        <th>Path Length</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedScoreboard.map((run, index) => (
                                        <tr key={index}>
                                            <td><strong>{run.algorithm}</strong></td>
                                            <td>{run.time.toFixed(2)}</td>
                                            <td>{run.nodesVisited}</td>
                                            <td>{run.pathLength}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Stats;