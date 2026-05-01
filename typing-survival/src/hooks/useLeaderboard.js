import { useState } from "react"
import { getLeaderboard, submitScore } from "../services/leaderboard"
import badWords from "../data/badWords.json"

const sanitizePlayerName = (name) => {
    return name
        .trim()
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 12)
}

const normalizeName = (name) => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
}

const containsProfanity = (name) => {
    const normalized = normalizeName(name)

    return badWords.some((word) => {
        const normalizedWord = word.toLowerCase().replace(/[^a-z0-9]/g, "")
        return normalizedWord && normalized.includes(normalizedWord)
    })
}

function useLeaderboard(finalScore) {
    const [showLeaderboard, setShowLeaderboard] = useState(false)
    const [leaderboard, setLeaderboard] = useState([])
    const [leaderboardLoading, setLeaderboardLoading] = useState(false)
    const [leaderboardError, setLeaderboardError] = useState("")

    const [leaderboardType, setLeaderboardType] = useState("weekly")
    const [leaderboardLimit, setLeaderboardLimit] = useState(10)

    const [playerName, setPlayerName] = useState("")
    const [scoreSubmitted, setScoreSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState("")
    const [submittingScore, setSubmittingScore] = useState(false)

    const loadLeaderboard = async (
        type = leaderboardType,
        limit = leaderboardLimit
    ) => {
        try {
            setLeaderboardLoading(true)
            setLeaderboardError("")
            const data = await getLeaderboard(type, limit)
            setLeaderboard(data)
        } catch (error) {
            setLeaderboardError("Failed to load leaderboard")
        } finally {
            setLeaderboardLoading(false)
        }
    }

    const changeLeaderboardType = async (type) => {
        const newLimit = 10

        setLeaderboardType(type)
        setLeaderboardLimit(newLimit)
        await loadLeaderboard(type, newLimit)
    }

    const showMoreAllTime = async () => {
        const newLimit = 50

        setLeaderboardLimit(newLimit)
        await loadLeaderboard("all-time", newLimit)
    }

    const handleSubmitScore = async () => {
        const cleanedName = sanitizePlayerName(playerName)

        if (!cleanedName) {
            setSubmitError("Please enter a valid name")
            return
        }

        if (containsProfanity(cleanedName)) {
            setSubmitError("Inappropriate name not allowed")
            return
        }

        try {
            setSubmittingScore(true)
            setSubmitError("")
            await submitScore(cleanedName, finalScore)
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
        setLeaderboardType("weekly")
        setLeaderboardLimit(10)
    }

    return {
        showLeaderboard,
        setShowLeaderboard,
        leaderboard,
        leaderboardLoading,
        leaderboardError,
        leaderboardType,
        leaderboardLimit,
        changeLeaderboardType,
        showMoreAllTime,
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