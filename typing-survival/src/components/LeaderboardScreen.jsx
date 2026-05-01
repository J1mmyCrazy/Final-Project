function LeaderboardScreen({
                               leaderboard,
                               leaderboardLoading,
                               leaderboardError,
                               leaderboardType,
                               leaderboardLimit,
                               onChangeLeaderboardType,
                               onShowMoreAllTime,
                               onBack,
                           }) {
    const tabButtonStyle = (active) => ({
        padding: "12px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        borderRadius: "12px",
        border: active ? "1px solid #ffd54a" : "1px solid #3a3a3a",
        background: active ? "#ffd54a" : "#1b1b1b",
        color: active ? "#111" : "white",
    })

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#050505",
                color: "white",
                padding: "20px",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "700px",
                    background: "#111",
                    border: "1px solid #2a2a2a",
                    borderRadius: "20px",
                    padding: "40px",
                    boxShadow: "0 0 30px rgba(0,0,0,0.35)",
                }}
            >
                <h1
                    style={{
                        fontSize: "48px",
                        margin: "0 0 25px 0",
                        textAlign: "center",
                        color: "#ffd54a",
                    }}
                >
                    Leaderboard
                </h1>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "12px",
                        marginBottom: "25px",
                    }}
                >
                    <button
                        onClick={() => onChangeLeaderboardType("weekly")}
                        style={tabButtonStyle(leaderboardType === "weekly")}
                    >
                        Weekly
                    </button>

                    <button
                        onClick={() => onChangeLeaderboardType("all-time")}
                        style={tabButtonStyle(leaderboardType === "all-time")}
                    >
                        All-Time
                    </button>
                </div>

                <div style={{ minHeight: "600px" }}>
                    {leaderboardLoading && leaderboard.length === 0 ? (
                        <p style={{ textAlign: "center" }}>Loading...</p>
                    ) : leaderboardError ? (
                        <p style={{ textAlign: "center", color: "#ff8a80" }}>
                            {leaderboardError}
                        </p>
                    ) : leaderboard.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#cfcfcf" }}>
                            No scores yet.
                        </p>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                marginBottom: "25px",
                            }}
                        >
                            {leaderboard.map((entry, index) => (
                                <div
                                    key={entry.id || entry._id || index}
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "80px 1fr 120px",
                                        alignItems: "center",
                                        padding: "14px 16px",
                                        background: "#1a1a1a",
                                        border: "1px solid #2a2a2a",
                                        borderRadius: "12px",
                                        fontSize: "18px",
                                    }}
                                >
                                    <div style={{ fontWeight: "bold", color: "#ffd54a" }}>
                                        #{index + 1}
                                    </div>
                                    <div>{entry.name}</div>
                                    <div style={{ textAlign: "right", fontWeight: "bold" }}>
                                        {entry.score}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {leaderboardType === "all-time" &&
                    leaderboardLimit < 50 &&
                    !leaderboardLoading && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: "20px",
                            }}
                        >
                            <button
                                onClick={onShowMoreAllTime}
                                style={{
                                    padding: "12px 20px",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    borderRadius: "12px",
                                    border: "1px solid #3a3a3a",
                                    background: "#1b1b1b",
                                    color: "white",
                                }}
                            >
                                Show More
                            </button>
                        </div>
                    )}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <button
                        onClick={onBack}
                        style={{
                            padding: "14px 24px",
                            fontSize: "18px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            borderRadius: "12px",
                            border: "1px solid #3a3a3a",
                            background: "#1b1b1b",
                            color: "white",
                        }}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LeaderboardScreen