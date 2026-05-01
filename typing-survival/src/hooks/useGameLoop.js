import { useEffect } from "react"
import { getCurrentWordList, getSpawnRate } from "../utils/difficulty"
import { calculateFinalScore, getAccuracy } from "../utils/score"

function useGameLoop({
                         gameStarted,
                         gameOver,
                         currentMode,
                         activeLanes,
                         stageWordsDestroyed,
                         allWords,
                         enemies,
                         misses,
                         score,
                         timeSurvived,
                         wordsDestroyed,
                         perfectWordsTyped,
                         totalWordsCompleted,
                         maxCombo,
                         activeEnemyId,
                         setEnemies,
                         setTimeSurvived,
                         setFinalScore,
                         setGameOver,
                         setGameStarted,
                         setPromptMessage,
                         setActiveEnemyId,
                         setTypedIndex,
                         stopMusic,
                     }) {
    useEffect(() => {
        if (!gameStarted || gameOver) return

        const spawnInterval = setInterval(() => {
            setEnemies((prev) => {
                const currentWords = getCurrentWordList(currentMode, allWords)

                const usedFirstLetters = new Set(
                    prev.map((enemy) => enemy.word[0].toLowerCase())
                )

                const availableWords = currentWords.filter(
                    (word) => !usedFirstLetters.has(word[0].toLowerCase())
                )

                if (availableWords.length === 0) {
                    return prev
                }

                const laneCounts = Array.from({ length: activeLanes }, (_, lane) => {
                    return prev.filter((enemy) => enemy.lane === lane).length
                })

                const availableLanes = laneCounts
                    .map((count, lane) => ({ count, lane }))
                    .filter(({ count }) => count < 2)

                if (availableLanes.length === 0) {
                    return prev
                }

                const bestLaneCount = Math.min(
                    ...availableLanes.map(({ count }) => count)
                )

                const bestLanes = availableLanes.filter(
                    ({ count }) => count === bestLaneCount
                )

                const randomLane =
                    bestLanes[Math.floor(Math.random() * bestLanes.length)].lane

                const randomWord =
                    availableWords[Math.floor(Math.random() * availableWords.length)]

                const newEnemy = {
                    id: Date.now() + Math.random(),
                    word: randomWord,
                    lane: randomLane,
                }

                return [...prev, newEnemy]
            })
        }, getSpawnRate(currentMode, stageWordsDestroyed))

        return () => clearInterval(spawnInterval)
    }, [
        gameStarted,
        gameOver,
        currentMode,
        activeLanes,
        stageWordsDestroyed,
        allWords,
        setEnemies,
    ])

    useEffect(() => {
        if (!gameStarted || gameOver) return

        const timerInterval = setInterval(() => {
            setTimeSurvived((prev) => prev + 1)
        }, 1000)

        return () => clearInterval(timerInterval)
    }, [gameStarted, gameOver, setTimeSurvived])

    useEffect(() => {
        if (misses >= 3) {
            stopMusic?.()

            setFinalScore(
                calculateFinalScore({
                    score,
                    mode: currentMode,
                    lanes: activeLanes,
                    stageWordsDestroyed,
                    timeSurvived,
                    wordsDestroyed,
                    accuracy: getAccuracy(perfectWordsTyped, totalWordsCompleted),
                    maxCombo,
                })
            )

            setGameOver(true)
            setGameStarted(false)
            setPromptMessage("")
            setActiveEnemyId(null)
            setTypedIndex(0)
        }
    }, [
        misses,
        score,
        currentMode,
        activeLanes,
        stageWordsDestroyed,
        timeSurvived,
        wordsDestroyed,
        perfectWordsTyped,
        totalWordsCompleted,
        maxCombo,
        setFinalScore,
        setGameOver,
        setGameStarted,
        setPromptMessage,
        setActiveEnemyId,
        setTypedIndex,
        stopMusic,
    ])
}

export default useGameLoop