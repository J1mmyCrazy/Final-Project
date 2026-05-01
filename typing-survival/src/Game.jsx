import { useState } from "react"
import GameHUD from "./components/GameHUD"
import GameArena from "./components/GameArena"
import IntroScreen from "./components/IntroScreen"
import useLeaderboard from "./hooks/useLeaderboard"
import { allWords } from "./data/words"
import LeaderboardScreen from "./components/LeaderboardScreen"
import MainMenu from "./components/MainMenu"
import { motion } from "motion/react"
import GameOverScreen from "./components/GameOverScreen"
import {
    getCurrentDifficulty,
    getPointsForDifficulty,
    getEnemyDuration
} from "./utils/difficulty"

import {
    getComboMultiplier,
    getDifficultyMultiplier,
    getLaneMultiplier,
    getStageMultiplier,
    getAccuracy
} from "./utils/score"

import { LANE_POSITIONS, MAX_COMBO } from "./config/gameConfig"
import { getProgressionResult } from "./utils/progression"
import useGameInput from "./hooks/useGameInput"
import useGameLoop from "./hooks/useGameLoop"
import usePromptMessage from "./hooks/usePromptMessage"
import useGameAudio from "./hooks/useGameAudio"

function Game() {
    const [enemies, setEnemies] = useState([])
    const [shake, setShake] = useState(false)

    const [score, setScore] = useState(0)
    const [timeSurvived, setTimeSurvived] = useState(0)
    const [misses, setMisses] = useState(0)

    const [gameStarted, setGameStarted] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [introComplete, setIntroComplete] = useState(false)

    const [currentMode, setCurrentMode] = useState("easy")
    const [wordsDestroyed, setWordsDestroyed] = useState(0)
    const [stageWordsDestroyed, setStageWordsDestroyed] = useState(0)
    const [activeLanes, setActiveLanes] = useState(1)

    const [activeEnemyId, setActiveEnemyId] = useState(null)
    const [typedIndex, setTypedIndex] = useState(0)

    const [finalScore, setFinalScore] = useState(0)
    const [combo, setCombo] = useState(0)
    const [maxCombo, setMaxCombo] = useState(0)
    const [wordHadMistake, setWordHadMistake] = useState(false)
    const [perfectWordsTyped, setPerfectWordsTyped] = useState(0)
    const [totalWordsCompleted, setTotalWordsCompleted] = useState(0)

    const {
        playCorrectKey,
        playWrongKey,
        playWordComplete,
        playMiss,
        startGameMusic,
        startMenuMusic,
        stopMusic,
    } = useGameAudio()

    const {
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
    } = useLeaderboard(finalScore)

    const {
        promptMessage,
        setPromptMessage,
        showPrompt,
        clearPrompt,
    } = usePromptMessage()

    const removeEnemy = (id) => {
        setEnemies((prev) => prev.filter((enemy) => enemy.id !== id))
    }

    const triggerShake = () => {
        setShake(true)

        setTimeout(() => {
            setShake(false)
        }, 300)
    }

    const handleCorrectWord = (enemyId) => {
        removeEnemy(enemyId)
        setActiveEnemyId(null)
        setTypedIndex(0)

        const perfectWord = !wordHadMistake
        const newCombo = perfectWord ? Math.min(combo + 1, MAX_COMBO) : 0
        const pointsEarned =
            getPointsForDifficulty(currentMode) * getComboMultiplier(newCombo)

        setScore((prev) => prev + pointsEarned)
        setTotalWordsCompleted((prev) => prev + 1)

        if (perfectWord) {
            setPerfectWordsTyped((prev) => prev + 1)
            setCombo(newCombo)
            setMaxCombo((currentMax) => Math.max(currentMax, newCombo))
        } else {
            setCombo(0)
        }

        setWordHadMistake(false)

        const nextWordsDestroyed = wordsDestroyed + 1
        const nextStageWordsDestroyed = stageWordsDestroyed + 1

        setWordsDestroyed(nextWordsDestroyed)

        const progression = getProgressionResult(currentMode, nextStageWordsDestroyed)

        if (progression.type === "lane") {
            setStageWordsDestroyed(progression.stageWordsDestroyed)
            setActiveLanes(progression.activeLanes)
            showPrompt(progression.prompt)
            return
        }

        if (progression.type === "mode") {
            setCurrentMode(progression.nextMode)
            setStageWordsDestroyed(progression.stageWordsDestroyed)
            setActiveLanes(progression.activeLanes)
            setEnemies([])
            setActiveEnemyId(null)
            setTypedIndex(0)
            setWordHadMistake(false)
            showPrompt(progression.prompt)
            return
        }

        setStageWordsDestroyed(progression.stageWordsDestroyed)
    }

    const handleMissedEnemy = (id) => {
        playMiss()

        setEnemies([])
        setActiveEnemyId(null)
        setTypedIndex(0)
        setWordHadMistake(false)
        setCombo(0)

        triggerShake()
        setMisses((prev) => prev + 1)
    }

    useGameInput({
        gameStarted,
        gameOver,
        enemies,
        activeEnemyId,
        typedIndex,
        currentMode,
        wordsDestroyed,
        stageWordsDestroyed,
        activeLanes,
        wordHadMistake,
        combo,
        setWordHadMistake,
        setActiveEnemyId,
        setTypedIndex,
        setCombo,
        handleCorrectWord,
        onCorrectKey: playCorrectKey,
        onWrongKey: playWrongKey,
        onWordComplete: playWordComplete,
    })

    useGameLoop({
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
    })

    const resetRunState = () => {
        setEnemies([])
        setShake(false)
        setScore(0)
        setFinalScore(0)
        setTimeSurvived(0)
        setMisses(0)

        setCurrentMode("easy")
        setWordsDestroyed(0)
        setStageWordsDestroyed(0)
        setActiveLanes(1)

        setActiveEnemyId(null)
        setTypedIndex(0)

        setCombo(0)
        setMaxCombo(0)
        setWordHadMistake(false)
        setPerfectWordsTyped(0)
        setTotalWordsCompleted(0)

        clearPrompt()
    }

    const resetMenuState = () => {
        resetLeaderboardState()
    }

    const handleIntroReady = () => {
        setIntroComplete(true)
        stopMusic()
        startMenuMusic()
    }

    const startGame = () => {
        stopMusic()
        resetRunState()
        resetMenuState()
        setGameOver(false)
        setGameStarted(true)
        showPrompt("EASY MODE")
        startGameMusic()
    }

    const goToMainMenu = () => {
        stopMusic()
        resetRunState()
        resetMenuState()
        setGameOver(false)
        setGameStarted(false)
        startMenuMusic()
    }

    const openLeaderboard = async () => {
        setShowLeaderboard(true)
        await loadLeaderboard()
    }

    const closeLeaderboard = () => {
        setShowLeaderboard(false)
    }

    if (!introComplete) {
        return <IntroScreen onReady={handleIntroReady} />
    }


    if (showLeaderboard) {
        return (
            <LeaderboardScreen
                leaderboard={leaderboard}
                leaderboardLoading={leaderboardLoading}
                leaderboardError={leaderboardError}
                leaderboardType={leaderboardType}
                leaderboardLimit={leaderboardLimit}
                onChangeLeaderboardType={changeLeaderboardType}
                onShowMoreAllTime={showMoreAllTime}
                onBack={closeLeaderboard}
            />
        )
    }

    if (!gameStarted && !gameOver) {
        return (
            <MainMenu
                onStart={startGame}
                onOpenLeaderboard={openLeaderboard}
            />
        )
    }

    if (gameOver) {
        return (
            <GameOverScreen
                finalScore={finalScore}
                score={score}
                timeSurvived={timeSurvived}
                wordsDestroyed={wordsDestroyed}
                maxCombo={maxCombo}
                perfectWordsTyped={perfectWordsTyped}
                totalWordsCompleted={totalWordsCompleted}
                getAccuracy={() => getAccuracy(perfectWordsTyped, totalWordsCompleted)}
                getCurrentDifficulty={() => getCurrentDifficulty(currentMode)}
                getDifficultyMultiplier={() => getDifficultyMultiplier(currentMode)}
                getLaneMultiplier={() => getLaneMultiplier(activeLanes)}
                getStageMultiplier={() => getStageMultiplier(stageWordsDestroyed)}
                playerName={playerName}
                setPlayerName={setPlayerName}
                scoreSubmitted={scoreSubmitted}
                submittingScore={submittingScore}
                submitError={submitError}
                onSubmitScore={handleSubmitScore}
                onViewLeaderboard={openLeaderboard}
                onRestart={startGame}
                onMainMenu={goToMainMenu}
            />
        )
    }

    return (
        <motion.div
            style={{ position: "relative" }}
            animate={shake ? { x: [0, -12, 12, -12, 12, 0] } : { x: 0 }}
            transition={{ duration: 0.3 }}
        >
            <GameHUD
                promptMessage={promptMessage}
                combo={combo}
                currentMode={currentMode}
                score={score}
                misses={misses}
                timeSurvived={timeSurvived}
                getCurrentDifficulty={getCurrentDifficulty}
            />

            <GameArena
                enemies={enemies}
                activeEnemyId={activeEnemyId}
                typedIndex={typedIndex}
                lanePositions={LANE_POSITIONS}
                getEnemyDuration={getEnemyDuration}
                currentMode={currentMode}
                stageWordsDestroyed={stageWordsDestroyed}
                handleMissedEnemy={handleMissedEnemy}
            />
        </motion.div>
    )
}

export default Game