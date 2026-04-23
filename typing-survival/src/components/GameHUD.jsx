// Heads-up display component: shows transient prompts, top info bar and large combo indicator.
//
// Props:
//  - promptMessage: optional center message shown briefly (e.g., "EASY MODE")
//  - combo: current combo count shown prominently
//  - currentMode, getCurrentDifficulty: used to display difficulty label
//  - score, misses, timeSurvived: basic run stats shown in the top bar
function GameHUD({
                     promptMessage,
                     combo,
                     currentMode,
                     score,
                     misses,
                     timeSurvived,
                     getCurrentDifficulty,
                 }) {
    return (
        <>
            {promptMessage && (
                // Large centered prompt message (non-interactive)
                <div
                    style={{
                        position: "absolute",
                        top: "42%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "56px",
                        fontWeight: 900,
                        color: "#ffd54a",
                        pointerEvents: "none",
                        zIndex: 20,
                        textShadow: "0 0 18px rgba(0,0,0,0.9)",
                        letterSpacing: "1px",
                        textAlign: "center",
                    }}
                >
                    {promptMessage}
                </div>
            )}

            {/* Top information bar: shows current mode, score, misses and time */}
            <div
                style={{
                    position: "absolute",
                    top: "-80px",
                    left: "24px",
                    right: "24px",
                    zIndex: 15,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "24px",
                    padding: "18px 24px",
                    borderRadius: "18px",
                    background: "rgba(10, 15, 25, 0.78)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                    color: "white",
                    boxSizing: "border-box",
                }}
            >
                <div
                    style={{
                        fontSize: "26px",
                        color: "#cbd5e1",
                        fontWeight: 800,
                        letterSpacing: "0.5px",
                        whiteSpace: "nowrap",
                    }}
                >
                    Mode: {getCurrentDifficulty(currentMode)}
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "32px",
                        fontSize: "28px",
                        fontWeight: 900,
                        flexWrap: "wrap",
                        justifyContent: "flex-end",
                        textAlign: "right",
                    }}
                >
                    <div>Score: {score}</div>
                    <div>Misses: {misses}/3</div>
                    <div>Time: {timeSurvived}s</div>
                </div>
            </div>

            {/* Large combo indicator at bottom center; style changes as combo increases */}
            <div
                style={{
                    position: "absolute",
                    top: "130%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 15,
                    textAlign: "center",
                    pointerEvents: "none",
                    minWidth: "260px",
                }}
            >
                <div
                    style={{
                        fontSize:
                            combo >= 25 ? "110px" : combo >= 10 ? "84px" : "64px",
                        fontWeight: 900,
                        color:
                            combo >= 25
                                ? "#ff7043"
                                : combo >= 10
                                    ? "#ffb300"
                                    : "#ffd54a",
                        textShadow: "0 0 18px rgba(255, 180, 0, 0.72)",
                        lineHeight: 1,
                    }}
                >
                    Combo x{combo}
                </div>

                {combo >= 10 && (
                    // Text badge for high combo streaks
                    <div
                        style={{
                            fontSize: "30px",
                            color: "#ffcc80",
                            marginTop: "8px",
                            letterSpacing: "2px",
                            lineHeight: 1,
                            fontWeight: 800,
                        }}
                    >
                        HOT STREAK
                    </div>
                )}
            </div>
        </>
    )
}

export default GameHUD