export const getProgressionResult = (currentMode, nextStageWordsDestroyed) => {
    if (currentMode === "easy") {
        if (nextStageWordsDestroyed === 10) {
            return {
                type: "lane",
                stageWordsDestroyed: nextStageWordsDestroyed,
                activeLanes: 2,
                prompt: "SECOND LANE OPEN",
            }
        }

        if (nextStageWordsDestroyed === 30) {
            return {
                type: "lane",
                stageWordsDestroyed: nextStageWordsDestroyed,
                activeLanes: 3,
                prompt: "THIRD LANE OPEN",
            }
        }

        if (nextStageWordsDestroyed >= 50) {
            return {
                type: "mode",
                nextMode: "medium",
                stageWordsDestroyed: 0,
                activeLanes: 1,
                prompt: "MEDIUM MODE",
            }
        }

        return {
            type: "none",
            stageWordsDestroyed: nextStageWordsDestroyed,
        }
    }

    if (currentMode === "medium") {
        if (nextStageWordsDestroyed === 10) {
            return {
                type: "lane",
                stageWordsDestroyed: nextStageWordsDestroyed,
                activeLanes: 2,
                prompt: "SECOND LANE OPEN",
            }
        }

        if (nextStageWordsDestroyed === 30) {
            return {
                type: "lane",
                stageWordsDestroyed: nextStageWordsDestroyed,
                activeLanes: 3,
                prompt: "THIRD LANE OPEN",
            }
        }

        if (nextStageWordsDestroyed >= 50) {
            return {
                type: "mode",
                nextMode: "hard",
                stageWordsDestroyed: 0,
                activeLanes: 1,
                prompt: "HARD MODE",
            }
        }

        return {
            type: "none",
            stageWordsDestroyed: nextStageWordsDestroyed,
        }
    }

    if (nextStageWordsDestroyed === 10) {
        return {
            type: "lane",
            stageWordsDestroyed: nextStageWordsDestroyed,
            activeLanes: 2,
            prompt: "SECOND LANE OPEN",
        }
    }

    if (nextStageWordsDestroyed === 30) {
        return {
            type: "lane",
            stageWordsDestroyed: nextStageWordsDestroyed,
            activeLanes: 3,
            prompt: "THIRD LANE OPEN",
        }
    }

    return {
        type: "none",
        stageWordsDestroyed: nextStageWordsDestroyed,
    }
}