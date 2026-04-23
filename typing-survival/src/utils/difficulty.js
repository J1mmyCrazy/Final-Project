export const getCurrentDifficulty = (mode) => {
    if (mode === "hard") return "Hard"
    if (mode === "medium") return "Medium"
    return "Easy"
}

export const getCurrentWordList = (mode, allWords) => {
    if (mode === "hard") {
        return allWords.filter((word) => word.length >= 9)
    }

    if (mode === "medium") {
        return allWords.filter((word) => word.length >= 5 && word.length <= 8)
    }

    return allWords.filter((word) => word.length >= 3 && word.length <= 4)
}

export const getPointsForDifficulty = (mode) => {
    if (mode === "hard") return 5
    if (mode === "medium") return 3
    return 1
}

export const getEnemyDuration = (mode, stageWordsDestroyed) => {
    let baseDuration = 8

    if (mode === "medium") baseDuration = 6.5
    if (mode === "hard") baseDuration = 5

    const stageSpeedUp = Math.floor(stageWordsDestroyed / 8) * 0.5
    const duration = baseDuration - stageSpeedUp

    return Math.max(duration, 2)
}

export const getSpawnRate = (mode, stageWordsDestroyed) => {
    let baseSpawnRate = 1600

    if (mode === "medium") baseSpawnRate = 1300
    if (mode === "hard") baseSpawnRate = 1000

    const stageSpawnBoost = Math.floor(stageWordsDestroyed / 10) * 100
    const spawnRate = baseSpawnRate - stageSpawnBoost

    return Math.max(spawnRate, 450)
}