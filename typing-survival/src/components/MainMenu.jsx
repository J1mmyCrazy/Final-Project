function MainMenu({ onStart, onOpenLeaderboard }) {
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
                    textAlign: "center",
                    boxShadow: "0 0 30px rgba(0,0,0,0.35)",
                }}
            >
                <h1
                    style={{
                        fontSize: "56px",
                        margin: "0 0 20px 0",
                        color: "#ffd54a",
                    }}
                >
                    Typing Survival
                </h1>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "15px",
                        flexWrap: "wrap",
                    }}
                >
                    <button
                        onClick={onStart}
                        style={{
                            padding: "14px 28px",
                            fontSize: "18px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            borderRadius: "12px",
                            border: "none",
                            background: "#ffd54a",
                            color: "#111",
                        }}
                    >
                        Start Game
                    </button>

                    <button
                        onClick={onOpenLeaderboard}
                        style={{
                            padding: "14px 28px",
                            fontSize: "18px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            borderRadius: "12px",
                            border: "1px solid #3a3a3a",
                            background: "#1b1b1b",
                            color: "white",
                        }}
                    >
                        Leaderboard
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MainMenu