// Utility helpers for difficulty-related logic: labels, word lists, scoring and timing.

export const getCurrentDifficulty = (mode) => {
    if (mode === "hard") return "Hard"
    if (mode === "medium") return "Medium"
    return "Easy"
}

export const getCurrentWordList = (mode, allWords) => {
    if (mode === "hard") {
        return allWords.filter((word) => word.length >= 8 && word.length <= 10)
    }

    if (mode === "medium") {
        return allWords.filter((word) => word.length >= 5 && word.length <= 7)
    }

    return allWords.filter((word) => word.length >= 3 && word.length <= 4)
}

export const getPointsForDifficulty = (mode) => {
    if (mode === "hard") return 5
    if (mode === "medium") return 3
    return 1
}

export const getEnemyDuration = (mode, stageWordsDestroyed) => {
    let baseDuration = 8.5

    if (mode === "medium") baseDuration = 7
    if (mode === "hard") baseDuration = 5.8

    const stageSpeedUp = Math.floor(stageWordsDestroyed / 8) * 0.45
    const duration = baseDuration - stageSpeedUp

    return Math.max(duration, 2.25)
}

export const getSpawnRate = (mode, stageWordsDestroyed) => {
    let baseSpawnRate = 1800

    if (mode === "medium") baseSpawnRate = 1550
    if (mode === "hard") baseSpawnRate = 1300

    const stageSpawnBoost = Math.floor(stageWordsDestroyed / 12) * 75
    const spawnRate = baseSpawnRate - stageSpawnBoost

    return Math.max(spawnRate, 700)
}