import { useState } from "react"

const SUGGESTION_API_URL = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace("/api/leaderboard", "/api/suggestions")
    : "http://localhost:5000/api/suggestions"

function MainMenu({ onStart, onOpenLeaderboard }) {
    const [showPatchNotes, setShowPatchNotes] = useState(false)
    const [showCredits, setShowCredits] = useState(false)
    const [showSuggestionBox, setShowSuggestionBox] = useState(false)

    const [suggestion, setSuggestion] = useState("")
    const [suggestionStatus, setSuggestionStatus] = useState("")
    const [submittingSuggestion, setSubmittingSuggestion] = useState(false)

    const buttonStyle = {
        padding: "14px 28px",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
        borderRadius: "12px",
        border: "1px solid #3a3a3a",
        background: "#1b1b1b",
        color: "white",
    }

    const closeButtonStyle = {
        padding: "12px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        borderRadius: "12px",
        border: "1px solid #3a3a3a",
        background: "#1b1b1b",
        color: "white",
    }

    const modalBackdropStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    }

    const modalStyle = {
        width: "90%",
        maxWidth: "600px",
        background: "#111",
        border: "1px solid #2a2a2a",
        borderRadius: "20px",
        padding: "30px",
        color: "white",
    }

    const handleSubmitSuggestion = async () => {
        const cleanedSuggestion = suggestion.trim()

        if (!cleanedSuggestion) {
            setSuggestionStatus("Please enter a suggestion first.")
            return
        }

        if (cleanedSuggestion.length > 500) {
            setSuggestionStatus("Suggestion must be 500 characters or less.")
            return
        }

        try {
            setSubmittingSuggestion(true)
            setSuggestionStatus("")

            const response = await fetch(SUGGESTION_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: cleanedSuggestion }),
            })

            if (!response.ok) {
                throw new Error("Failed to submit suggestion")
            }

            setSuggestion("")
            setSuggestionStatus("Thanks! Your suggestion was submitted.")
        } catch (error) {
            setSuggestionStatus("Failed to submit suggestion.")
        } finally {
            setSubmittingSuggestion(false)
        }
    }

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
                            ...buttonStyle,
                            border: "none",
                            background: "#ffd54a",
                            color: "#111",
                        }}
                    >
                        Start Game
                    </button>

                    <button onClick={onOpenLeaderboard} style={buttonStyle}>
                        Leaderboard
                    </button>

                    <button onClick={() => setShowPatchNotes(true)} style={buttonStyle}>
                        Patch Notes
                    </button>

                    <button onClick={() => setShowCredits(true)} style={buttonStyle}>
                        Credits
                    </button>

                    <button onClick={() => setShowSuggestionBox(true)} style={buttonStyle}>
                        Suggestion Box
                    </button>
                </div>
            </div>

            {showPatchNotes && (
                <div style={modalBackdropStyle}>
                    <div style={modalStyle}>
                        <h2 style={{ color: "#ffd54a", marginBottom: "15px" }}>
                            Patch Notes
                        </h2>

                        <div style={{ textAlign: "center", marginBottom: "15px" }}>
                            <h3 style={{ color: "#ffd54a", margin: 0 }}>
                                Version 1.1
                            </h3>
                            <p style={{ color: "#aaa", fontSize: "14px", margin: 0 }}>
                                April 2026
                            </p>
                        </div>

                        <div style={{ textAlign: "left", lineHeight: "1.6" }}>
                            <p><strong>Gameplay Improvements</strong></p>
                            <ul>
                                <li>Adjusted difficulty scaling</li>
                                <li>Medium words are now 5–7 characters</li>
                                <li>Hard words are now 8–10 characters</li>
                                <li>Improved spawn system to prevent overlapping enemies</li>
                                <li>Adjusted spawn rate scaling for better pacing</li>
                                <li>Added “clear screen on miss”</li>
                                <li>Added ESC and Backspace to cancel active word</li>
                            </ul>

                            <p><strong>Audio</strong></p>
                            <ul>
                                <li>Increased volume of incorrect key sound</li>
                            </ul>

                            <p><strong>Leaderboard</strong></p>
                            <ul>
                                <li>Added Weekly leaderboard (Top 10)</li>
                                <li>Expanded All-Time leaderboard (Top 50)</li>
                                <li>“Show More” option for All-Time scores</li>
                                <li>Added name validation and filtering</li>
                            </ul>

                            <p><strong>New Features</strong></p>
                            <ul>
                                <li>Suggestion Box for anonymous feedback</li>
                                <li>Patch Notes menu added</li>
                                <li>Credits screen added</li>
                            </ul>
                        </div>

                        <div style={{ textAlign: "center", marginTop: "20px" }}>
                            <button
                                onClick={() => setShowPatchNotes(false)}
                                style={closeButtonStyle}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showCredits && (
                <div style={modalBackdropStyle}>
                    <div
                        style={{
                            ...modalStyle,
                            maxWidth: "750px",
                        }}
                    >
                        <h2
                            style={{
                                color: "#ffd54a",
                                marginBottom: "25px",
                                textAlign: "center",
                                fontSize: "36px",
                            }}
                        >
                            Credits
                        </h2>

                        <div
                            style={{
                                textAlign: "center",
                                lineHeight: "2",
                                fontSize: "18px",
                            }}
                        >
                            <p style={{ fontWeight: "bold", fontSize: "22px", color: "#ffd54a" }}>
                                Created By
                            </p>
                            <p>James Uriarte</p>

                            <br />

                            <p style={{ fontWeight: "bold", fontSize: "22px", color: "#ffd54a" }}>
                                Inspiration
                            </p>
                            <p>NitroType</p>
                            <p>The Typing of the Dead</p>

                            <br />

                            <p style={{ fontWeight: "bold", fontSize: "22px", color: "#ffd54a" }}>
                                Special Thanks
                            </p>
                            <p>Professor Osvaldo</p>
                            <p>Professor Sing Chun</p>
                            <p>All playtesters</p>

                            <br />

                            <p style={{ fontWeight: "bold", fontSize: "22px", color: "#ffd54a" }}>
                                Audio
                            </p>
                            <p>Sound Effects — Freesound.org (CC0)</p>
                            <p>Music — Pixabay</p>
                        </div>

                        <div style={{ textAlign: "center", marginTop: "30px" }}>
                            <button
                                onClick={() => setShowCredits(false)}
                                style={closeButtonStyle}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSuggestionBox && (
                <div style={modalBackdropStyle}>
                    <div style={modalStyle}>
                        <h2 style={{ color: "#ffd54a", marginBottom: "15px" }}>
                            Suggestion Box
                        </h2>

                        <p style={{ color: "#cfcfcf", lineHeight: "1.5" }}>
                            Leave anonymous feedback, ideas, or bug reports.
                        </p>

                        <textarea
                            value={suggestion}
                            onChange={(e) => setSuggestion(e.target.value)}
                            maxLength={500}
                            placeholder="Type your suggestion here..."
                            style={{
                                width: "100%",
                                minHeight: "140px",
                                resize: "vertical",
                                padding: "14px",
                                boxSizing: "border-box",
                                borderRadius: "12px",
                                border: "1px solid #3a3a3a",
                                background: "#1b1b1b",
                                color: "white",
                                fontSize: "16px",
                                outline: "none",
                            }}
                        />

                        <p style={{ textAlign: "right", color: "#888", fontSize: "14px" }}>
                            {suggestion.length}/500
                        </p>

                        {suggestionStatus && (
                            <p
                                style={{
                                    textAlign: "center",
                                    color: suggestionStatus.includes("Thanks")
                                        ? "#9ccc65"
                                        : "#ff8a80",
                                }}
                            >
                                {suggestionStatus}
                            </p>
                        )}

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "12px",
                                marginTop: "20px",
                                flexWrap: "wrap",
                            }}
                        >
                            <button
                                onClick={handleSubmitSuggestion}
                                disabled={submittingSuggestion}
                                style={{
                                    ...closeButtonStyle,
                                    background: "#ffd54a",
                                    color: "#111",
                                    border: "none",
                                    opacity: submittingSuggestion ? 0.6 : 1,
                                }}
                            >
                                {submittingSuggestion ? "Submitting..." : "Submit"}
                            </button>

                            <button
                                onClick={() => {
                                    setShowSuggestionBox(false)
                                    setSuggestionStatus("")
                                }}
                                style={closeButtonStyle}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MainMenu