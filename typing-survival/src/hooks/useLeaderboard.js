import { useState } from "react"
import { getLeaderboard, submitScore } from "../services/leaderboard"

function useLeaderboard(finalScore) {
    const [showLeaderboard, setShowLeaderboard] = useState(false)
    const [leaderboard, setLeaderboard] = useState([])
    const [leaderboardLoading, setLeaderboardLoading] = useState(false)
    const [leaderboardError, setLeaderboardError] = useState("")

    const [playerName, setPlayerName] = useState("")
    const [scoreSubmitted, setScoreSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState("")
    const [submittingScore, setSubmittingScore] = useState(false)

    const loadLeaderboard = async () => {
        try {
            setLeaderboardLoading(true)
            setLeaderboardError("")
            const data = await getLeaderboard()
            setLeaderboard(data)
        } catch (error) {
            setLeaderboardError("Failed to load leaderboard")
        } finally {
            setLeaderboardLoading(false)
        }
    }

    const handleSubmitScore = async () => {
        const trimmedName = playerName.trim()

        if (!trimmedName) {
            setSubmitError("Please enter your name")
            return
        }

        try {
            setSubmittingScore(true)
            setSubmitError("")
            await submitScore(trimmedName, finalScore)
            setScoreSubmitted(true)
            await loadLeaderboard()
        } catch (error) {
            setSubmitError("Failed to submit score")
        } finally {
            setSubmittingScore(false)
        }
    }

    const resetLeaderboardState = () => {
        setPlayerName("")
        setScoreSubmitted(false)
        setSubmitError("")
        setSubmittingScore(false)
        setShowLeaderboard(false)
        setLeaderboardError("")
    }

    return {
        showLeaderboard,
        setShowLeaderboard,
        leaderboard,
        leaderboardLoading,
        leaderboardError,
        playerName,
        setPlayerName,
        scoreSubmitted,
        submitError,
        submittingScore,
        loadLeaderboard,
        handleSubmitScore,
        resetLeaderboardState,
    }
}

export default useLeaderboard