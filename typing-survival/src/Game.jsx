import { useState } from "react"
import GameHUD from "./components/GameHUD"
import GameArena from "./components/GameArena"
import IntroScreen from "./components/IntroScreen"
import useLeaderboard from "./hooks/useLeaderboard"
import { allWords } from "./data/words"
import LeaderboardScreen from "./components/LeaderboardScreen"
import MainMenu from "./components/MainMenu"
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

// Top-level Game component: coordinates state, input, audio, progression and UI screens.
function Game() {
    // --- State: dynamic in-game entities and visual feedback ---
    const [enemies, setEnemies] = useState([])
    const [shake, setShake] = useState(false)

    // --- State: scoring / progress / performance tracking ---
    const [score, setScore] = useState(0)
    const [timeSurvived, setTimeSurvived] = useState(0)
    const [misses, setMisses] = useState(0)

    // --- State: high-level game flow ---
    const [gameStarted, setGameStarted] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [introComplete, setIntroComplete] = useState(false)

    // --- State: difficulty / progression ---
    const [currentMode, setCurrentMode] = useState("easy")
    const [wordsDestroyed, setWordsDestroyed] = useState(0)
    const [stageWordsDestroyed, setStageWordsDestroyed] = useState(0)
    const [activeLanes, setActiveLanes] = useState(1)

    // --- State: typing / active target management ---
    const [activeEnemyId, setActiveEnemyId] = useState(null)
    const [typedIndex, setTypedIndex] = useState(0)

    // --- State: end-of-run summary & combo tracking ---
    const [finalScore, setFinalScore] = useState(0)
    const [combo, setCombo] = useState(0)
    const [maxCombo, setMaxCombo] = useState(0)
    const [wordHadMistake, setWordHadMistake] = useState(false)
    const [perfectWordsTyped, setPerfectWordsTyped] = useState(0)
    const [totalWordsCompleted, setTotalWordsCompleted] = useState(0)

    // --- Audio hooks: play sounds and control music ---
    const {
        playCorrectKey,
        playWrongKey,
        playWordComplete,
        playMiss,
        startGameMusic,
        startMenuMusic,
        stopMusic,
    } = useGameAudio()

    // --- Leaderboard hook: fetch / submit scores and UI flow for leaderboard ---
    const {
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
    } = useLeaderboard(finalScore)

    // --- Prompt message hook: small UI messages shown between stages or events ---
    const {
        promptMessage,
        setPromptMessage,
        showPrompt,
        clearPrompt,
    } = usePromptMessage()

    // --- Helper: remove an enemy by id from state ---
    const removeEnemy = (id) => {
        setEnemies((prev) => prev.filter((enemy) => enemy.id !== id))
    }

    // --- Helper: trigger a screen shake visual effect briefly ---
    const triggerShake = () => {
        setShake(true)

        setTimeout(() => {
            setShake(false)
        }, 300)
    }

    // --- Handler: called when player correctly completes a word ---
    // Updates score/combo, removes enemy, advances progression and shows prompts when needed.
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
            // reward perfect-word combo and track max combo
            setPerfectWordsTyped((prev) => prev + 1)
            setCombo(newCombo)
            setMaxCombo((currentMax) => Math.max(currentMax, newCombo))
        } else {
            // reset combo on imperfect word
            setCombo(0)
        }

        setWordHadMistake(false)

        const nextWordsDestroyed = wordsDestroyed + 1
        const nextStageWordsDestroyed = stageWordsDestroyed + 1

        setWordsDestroyed(nextWordsDestroyed)

        // Determine progression: maybe open new lane(s), advance difficulty mode, or continue current stage
        const progression = getProgressionResult(currentMode, nextStageWordsDestroyed)

        if (progression.type === "lane") {
            // unlock lanes and show a prompt
            setStageWordsDestroyed(progression.stageWordsDestroyed)
            setActiveLanes(progression.activeLanes)
            showPrompt(progression.prompt)
            return
        }

        if (progression.type === "mode") {
            // switch difficulty mode, reset enemies and typing state, show prompt
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

    // --- Handler: called when an enemy reaches the player (miss) ---
    // Plays miss audio, resets typing and combo if active target was missed, triggers visual shake.
    const handleMissedEnemy = (id) => {
        playMiss()

        if (id === activeEnemyId) {
            setActiveEnemyId(null)
            setTypedIndex(0)
            setWordHadMistake(false)
            setCombo(0)
        }

        removeEnemy(id)
        triggerShake()
        setMisses((prev) => prev + 1)
    }

    // --- Hook: handle keyboard input / typing logic ---
    // This hook uses the passed callbacks/state to manage typing, key sounds and completion.
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

    // --- Hook: main game loop / spawn logic / timers ---
    // Orchestrates spawning, timers, final score calculation and ending the run.
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

    // --- Reset functions used when starting/restarting or returning to menu ---
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
        // Reset any leaderboard-specific UI state when re-entering menu
        resetLeaderboardState()
    }

    // --- Handlers to manage intro, start game, main menu navigation, leaderboard open/close ---
    const handleIntroReady = () => {
        setIntroComplete(true)
        stopMusic()
        startMenuMusic()
    }

    const startGame = () => {
        // Prepare run state and start gameplay music.
        stopMusic()
        resetRunState()
        resetMenuState()
        setGameOver(false)
        setGameStarted(true)
        showPrompt("EASY MODE")
        startGameMusic()
    }

    const goToMainMenu = () => {
        // Stop gameplay and return to main menu music / UI.
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

    // --- Render logic: show Intro -> Leaderboard -> MainMenu -> GameOver -> Game (HUD + Arena) ---
    if (!introComplete) {
        // Show intro animation/screen first
        return <IntroScreen onReady={handleIntroReady} />
    }

    if (showLeaderboard) {
        // Leaderboard overlay / screen
        return (
            <LeaderboardScreen
                leaderboard={leaderboard}
                leaderboardLoading={leaderboardLoading}
                leaderboardError={leaderboardError}
                onBack={closeLeaderboard}
            />
        )
    }

    if (!gameStarted && !gameOver) {
        // Main menu before a run starts
        return (
            <MainMenu
                onStart={startGame}
                onOpenLeaderboard={openLeaderboard}
            />
        )
    }

    if (gameOver) {
        // End-of-run summary and score submission UI
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

    // Default in-run UI: HUD (score/combo/prompt) and Arena (enemies, typing targets)
    return (
        <div style={{ position: "relative" }}>
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
                shake={shake}
                enemies={enemies}
                activeEnemyId={activeEnemyId}
                typedIndex={typedIndex}
                lanePositions={LANE_POSITIONS}
                activeLanes={activeLanes}
                getEnemyDuration={getEnemyDuration}
                currentMode={currentMode}
                stageWordsDestroyed={stageWordsDestroyed}
                handleMissedEnemy={handleMissedEnemy}
            />
        </div>
    )
}

export default Game