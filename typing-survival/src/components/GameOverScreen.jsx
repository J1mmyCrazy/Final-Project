function GameOverScreen({
                            finalScore,
                            score,
                            timeSurvived,
                            wordsDestroyed,
                            maxCombo,
                            perfectWordsTyped,
                            totalWordsCompleted,
                            getAccuracy,
                            getCurrentDifficulty,
                            getDifficultyMultiplier,
                            getLaneMultiplier,
                            getStageMultiplier,
                            playerName,
                            setPlayerName,
                            scoreSubmitted,
                            submittingScore,
                            submitError,
                            onSubmitScore,
                            onViewLeaderboard,
                            onRestart,
                            onMainMenu,
                        }) {
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
                    maxWidth: "760px",
                    background: "#111",
                    border: "1px solid #2a2a2a",
                    borderRadius: "20px",
                    padding: "40px",
                    boxShadow: "0 0 30px rgba(0,0,0,0.35)",
                }}
            >
                <h2
                    style={{
                        fontSize: "54px",
                        margin: "0 0 10px 0",
                        textAlign: "center",
                        color: "#ffd54a",
                    }}
                >
                    Game Over
                </h2>

                <p
                    style={{
                        textAlign: "center",
                        fontSize: "18px",
                        color: "#cfcfcf",
                        marginBottom: "30px",
                    }}
                >
                    You made it to {getCurrentDifficulty()} mode.
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "14px 30px",
                        fontSize: "18px",
                        lineHeight: 1.5,
                        marginBottom: "30px",
                    }}
                >
                    <div>Base Score: {score}</div>
                    <div>Time Bonus: {timeSurvived * 2}</div>

                    <div>Words Bonus: {wordsDestroyed * 3}</div>
                    <div>Accuracy Bonus: {getAccuracy() * 5}</div>

                    <div>Combo Bonus: {maxCombo * 10}</div>
                    <div>Accuracy: {getAccuracy()}%</div>

                    <div>Perfect Words: {perfectWordsTyped}</div>
                    <div>Total Completed: {totalWordsCompleted}</div>

                    <div>Max Combo: {maxCombo}</div>
                    <div>Difficulty Multiplier: {getDifficultyMultiplier()}x</div>

                    <div>Lane Multiplier: {getLaneMultiplier()}x</div>
                    <div>Stage Multiplier: {getStageMultiplier()}x</div>
                </div>

                <div
                    style={{
                        textAlign: "center",
                        fontSize: "38px",
                        fontWeight: "bold",
                        color: "#ffd54a",
                        marginBottom: "30px",
                    }}
                >
                    Final Score: {finalScore}
                </div>

                <div
                    style={{
                        marginBottom: "30px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        alignItems: "center",
                    }}
                >
                    {!scoreSubmitted ? (
                        <>
                            <input
                                type="text"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                placeholder="Enter your name"
                                maxLength={20}
                                style={{
                                    width: "100%",
                                    maxWidth: "320px",
                                    padding: "14px",
                                    fontSize: "16px",
                                    borderRadius: "12px",
                                    border: "1px solid #3a3a3a",
                                    background: "#1b1b1b",
                                    color: "white",
                                    boxSizing: "border-box",
                                }}
                            />

                            <button
                                onClick={onSubmitScore}
                                disabled={submittingScore}
                                style={{
                                    padding: "14px 24px",
                                    fontSize: "17px",
                                    fontWeight: "bold",
                                    cursor: submittingScore ? "default" : "pointer",
                                    borderRadius: "12px",
                                    border: "none",
                                    background: "#ffd54a",
                                    color: "#111",
                                    opacity: submittingScore ? 0.7 : 1,
                                }}
                            >
                                {submittingScore ? "Submitting..." : "Submit Score"}
                            </button>
                        </>
                    ) : (
                        <>
                            <div
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    color: "#81c784",
                                }}
                            >
                                Score submitted!
                            </div>

                            <button
                                onClick={onViewLeaderboard}
                                style={{
                                    padding: "14px 24px",
                                    fontSize: "17px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    borderRadius: "12px",
                                    border: "1px solid #3a3a3a",
                                    background: "#1b1b1b",
                                    color: "white",
                                }}
                            >
                                View Leaderboard
                            </button>
                        </>
                    )}

                    {submitError && (
                        <div
                            style={{
                                color: "#ff8a80",
                                fontSize: "15px",
                                textAlign: "center",
                            }}
                        >
                            {submitError}
                        </div>
                    )}
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "15px",
                        flexWrap: "wrap",
                    }}
                >
                    <button
                        onClick={onRestart}
                        style={{
                            padding: "14px 24px",
                            fontSize: "18px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            borderRadius: "12px",
                            border: "none",
                            background: "#ffd54a",
                            color: "#111",
                        }}
                    >
                        Restart Run
                    </button>

                    <button
                        onClick={onMainMenu}
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
                        Main Menu
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GameOverScreen