// Utility helpers for difficulty-related logic: labels, word lists, scoring and timing.

export const getCurrentDifficulty = (mode) => {
    // mode: "easy" | "medium" | "hard"
    // returns a human-friendly label for the difficulty mode.
    if (mode === "hard") return "Hard"
    if (mode === "medium") return "Medium"
    return "Easy"
}

export const getCurrentWordList = (mode, allWords) => {
    // mode: difficulty mode
    // allWords: array of candidate words
    // filters the global word list based on mode to control word length per difficulty.
    if (mode === "hard") {
        return allWords.filter((word) => word.length >= 9)
    }

    if (mode === "medium") {
        return allWords.filter((word) => word.length >= 5 && word.length <= 8)
    }

    return allWords.filter((word) => word.length >= 3 && word.length <= 4)
}

export const getPointsForDifficulty = (mode) => {
    // return base points awarded for completing a word at the given difficulty.
    if (mode === "hard") return 5
    if (mode === "medium") return 3
    return 1
}

export const getEnemyDuration = (mode, stageWordsDestroyed) => {
    // Calculates how long (seconds) an enemy takes to travel across the screen.
    // mode adjusts base speed; stageWordsDestroyed increases speed gradually.
    let baseDuration = 8

    if (mode === "medium") baseDuration = 6.5
    if (mode === "hard") baseDuration = 5

    const stageSpeedUp = Math.floor(stageWordsDestroyed / 8) * 0.5
    const duration = baseDuration - stageSpeedUp

    // enforce a minimum duration so enemies never move instantaneously.
    return Math.max(duration, 2)
}

export const getSpawnRate = (mode, stageWordsDestroyed) => {
    // Returns spawn interval (ms) between enemy spawns.
    // mode changes base spawn rate; stageWordsDestroyed reduces interval over time.
    let baseSpawnRate = 1600

    if (mode === "medium") baseSpawnRate = 1300
    if (mode === "hard") baseSpawnRate = 1000

    const stageSpawnBoost = Math.floor(stageWordsDestroyed / 10) * 100
    const spawnRate = baseSpawnRate - stageSpawnBoost

    // enforce a lower bound to avoid overwhelming spawn speeds.
    return Math.max(spawnRate, 450)
}