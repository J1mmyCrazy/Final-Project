const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api/leaderboard"

export async function getLeaderboard(type = "all-time", limit = 10) {
    const response = await fetch(`${API_URL}?type=${type}&limit=${limit}`)

    if (!response.ok) {
        throw new Error("Failed to fetch leaderboard")
    }

    return response.json()
}

export async function submitScore(name, score) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, score }),
    })

    if (!response.ok) {
        throw new Error("Failed to submit score")
    }

    return response.json()
}