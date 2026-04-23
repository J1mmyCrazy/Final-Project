export const getComboMultiplier = (combo) => {
    if (combo >= 25) return 5
    if (combo >= 15) return 4
    if (combo >= 10) return 3
    if (combo >= 5) return 2
    return 1
}

export const getDifficultyMultiplier = (mode) => {
    if (mode === "hard") return 2.0
    if (mode === "medium") return 1.5
    return 1.0
}

export const getLaneMultiplier = (lanes) => {
    if (lanes === 3) return 1.5
    if (lanes === 2) return 1.25
    return 1.0
}

export const getStageMultiplier = (stageWordsDestroyed) => {
    if (stageWordsDestroyed >= 30) return 1.3
    if (stageWordsDestroyed >= 10) return 1.15
    return 1.0
}

export const getAccuracy = (perfect, total) => {
    if (total === 0) return 0
    return Math.round((perfect / total) * 100)
}

export const calculateFinalScore = ({
                                        score,
                                        mode,
                                        lanes,
                                        stageWordsDestroyed,
                                        timeSurvived,
                                        wordsDestroyed,
                                        accuracy,
                                        maxCombo,
                                    }) => {
    return Math.floor(
        score *
        getDifficultyMultiplier(mode) *
        getLaneMultiplier(lanes) *
        getStageMultiplier(stageWordsDestroyed) +
        timeSurvived * 2 +
        wordsDestroyed * 3 +
        accuracy * 5 +
        maxCombo * 10
    )
}