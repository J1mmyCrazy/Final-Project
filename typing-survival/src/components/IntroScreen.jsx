function IntroScreen({ onReady }) {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(to bottom, #0f172a, #020617)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "32px",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "760px",
                    background: "rgba(15, 23, 42, 0.9)",
                    border: "2px solid #334155",
                    borderRadius: "20px",
                    padding: "36px",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
                    textAlign: "center",
                }}
            >
                <h1
                    style={{
                        fontSize: "48px",
                        margin: "0 0 12px 0",
                        color: "#facc15",
                        letterSpacing: "1px",
                    }}
                >
                    Typing Survival
                </h1>

                <h2><strong style={{ color: "#facc20" }}>Go into full screen for best experience (F11)</strong></h2>


                <p
                    style={{
                        fontSize: "20px",
                        margin: "0 0 28px 0",
                        color: "#cbd5e1",
                    }}
                >
                    Survive as long as you can by typing incoming words before they
                    reach the end.
                </p>

                <div
                    style={{
                        textAlign: "left",
                        background: "rgba(30, 41, 59, 0.85)",
                        borderRadius: "16px",
                        padding: "24px",
                        marginBottom: "28px",
                        lineHeight: 1.8,
                        fontSize: "18px",
                        color: "#e2e8f0",
                    }}
                >
                    <div><strong style={{ color: "#facc15" }}>How it works:</strong></div>
                    <div>• Type only letters a-z</div>
                    <div>• Match the highlighted word to lock onto it</div>
                    <div>• Correct letters progress through that word</div>
                    <div>• Mistakes reset your combo</div>
                    <div>• Completing a word removes it and gives points</div>
                    <div>• If a word reaches the end, it counts as a miss</div>
                    <div>• 3 misses = game over</div>
                    <div>• As you survive, lanes and difficulty increase</div>
                </div>

                <button
                    onClick={onReady}
                    style={{
                        background: "#facc15",
                        color: "#0f172a",
                        border: "none",
                        borderRadius: "14px",
                        padding: "14px 28px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        boxShadow: "0 10px 30px rgba(250, 204, 21, 0.25)",
                    }}
                >
                    I&apos;m Ready
                </button>
            </div>
        </div>
    )
}

export default IntroScreen