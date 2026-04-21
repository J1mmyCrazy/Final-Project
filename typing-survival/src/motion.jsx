import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"

const allWords = [
    "all", "ball", "bed", "big", "book", "box", "boy", "but", "came", "can",
    "car", "cat", "come", "cow", "dad", "day", "did", "dog", "fat", "fun",
    "get", "good", "got", "hat", "hen", "here", "him", "his", "home", "hot",
    "its", "let", "like", "look", "man", "may", "mom", "not", "old", "one",
    "out", "pan", "pet", "pig", "play", "ran", "rat", "red", "ride", "run",
    "sat", "see", "she", "sit", "six", "stop", "sun", "ten", "the", "this",
    "top", "toy", "two", "was", "will", "yes", "you", "about", "add", "after",
    "ago", "any", "apple", "ask", "ate", "away", "baby", "back", "bad", "bag",
    "base", "bat", "bee", "best", "bike", "bill", "bird", "black", "blue",
    "boat", "both", "bring", "brother", "brown", "bus", "buy", "cake", "call",
    "candy", "change", "child", "city", "clean", "club", "coat", "cold",
    "coming", "corn", "could", "cry", "cup", "cut", "daddy", "dear", "deep",
    "deer", "doing", "doll", "door", "down", "dress", "drive", "drop", "dry",
    "duck", "each", "eat", "eating", "egg", "end", "fall", "far", "farm",
    "fast", "father", "feed", "feel", "feet", "fell", "find", "fine", "fire",
    "first", "fish", "five", "fix", "flag", "floor", "fly", "food", "foot",
    "four", "fox", "from", "full", "funny", "game", "gas", "gave", "girl",
    "give", "glad", "goat", "goes", "going", "gold", "gone", "grade", "grass",
    "green", "grow", "hand", "happy", "hard", "has", "have", "hear", "help",
    "hill", "hit", "hold", "hole", "hop", "hope", "horse", "house", "how",
    "ice", "inch", "inside", "job", "jump", "just", "keep", "king", "know",
    "lake", "land", "last", "late", "lay", "left", "leg", "light", "line",
    "little", "live", "lives", "long", "looking", "lost", "lot", "love", "mad",
    "made", "make", "many", "meat", "men", "met", "mile", "milk", "mine",
    "miss", "moon", "more", "most", "mother", "move", "much", "must", "myself",
    "nail", "name", "need", "new", "next", "nice", "night", "nine", "north",
    "now", "nut", "off", "only", "open", "other", "our", "outside", "over",
    "page", "park", "part", "pay", "pick", "plant", "playing", "pony", "post",
    "pull", "put", "rabbit", "rain", "read", "rest", "riding", "road", "rock",
    "room", "said", "same", "sang", "saw", "say", "school", "sea", "seat",
    "seem", "seen", "send", "set", "seven", "sheep", "ship", "shoe", "show",
    "sick", "side", "sing", "sky", "sleep", "small", "snow", "some", "soon",
    "spell", "start", "stay", "still", "store", "story", "take", "talk",
    "tall", "teach", "tell", "than", "thank", "that", "them", "then", "there",
    "they", "thing", "think", "three", "time", "today", "told", "took", "train",
    "tree", "truck", "try", "use", "very", "walk", "want", "warm", "wash",
    "way", "week", "well", "went", "were", "wet", "what", "when", "while",
    "white", "who", "why", "wind", "wish", "with", "woke", "wood", "work",
    "yellow", "yet", "your", "able", "above", "afraid", "afternoon", "again",
    "age", "air", "airplane", "almost", "alone", "along", "already", "also",
    "always", "animal", "another", "anything", "around", "art", "aunt",
    "balloon", "bark", "barn", "basket", "beach", "bear", "because", "become",
    "began", "begin", "behind", "believe", "below", "belt", "better", "birthday",
    "body", "bones", "born", "bought", "bread", "bright", "broke", "brought",
    "busy", "cabin", "cage", "camp", "cant", "care", "carry", "catch", "cattle",
    "cave", "children", "class", "close", "cloth", "coal", "color", "corner",
    "cotton", "cover", "dark", "desert", "didnt", "dinner", "dishes", "does",
    "done", "dont", "dragon", "draw", "dream", "drink", "early", "earth", "east",
    "eight", "even", "ever", "every", "everyone", "everything", "eyes", "face",
    "family", "feeling", "felt", "few", "fight", "fishing", "flower", "flying",
    "follow", "forest", "forgot", "form", "found", "fourth", "free", "friday",
    "friend", "front", "getting", "given", "grandmother", "great", "grew",
    "ground", "guess", "hair", "half", "having", "head", "heard", "hello",
    "high", "himself", "hour", "hundred", "hurry", "hurt", "inches", "isnt",
    "kept", "kids", "kind", "kitten", "knew", "knife", "lady", "large",
    "largest", "later", "learn", "leave", "life", "list", "living", "lovely",
    "loving", "lunch", "mail", "making", "maybe", "mean", "merry", "might",
    "mind", "money", "month", "morning", "mouse", "mouth", "music", "near",
    "nearly", "never", "news", "noise", "nothing", "number", "often", "oil",
    "once", "orange", "order", "own", "pair", "paint", "paper", "party",
    "pass", "past", "penny", "people", "person", "picture", "place", "plan",
    "plane", "please", "pocket", "point", "poor", "race", "reach", "reading",
    "ready", "real", "rich", "right", "river", "rocket", "rode", "round",
    "rule", "running", "salt", "says", "sending", "sent", "seventh", "sew",
    "shall", "short", "shot", "should", "sight", "sister", "sitting", "sixth",
    "sled", "smoke", "soap", "someone", "something", "sometime", "song", "sorry",
    "sound", "south", "space", "spelling", "spent", "sport", "spring", "stairs",
    "stand", "state", "step", "stick", "stood", "stopped", "stove", "street",
    "strong", "study", "such", "sugar", "summer", "sunday", "supper", "table",
    "taken", "taking", "talking", "teacher", "team", "teeth", "their", "these",
    "thinking", "third", "those", "thought", "throw", "tonight", "trade",
    "trick", "trip", "trying", "turn", "twelve", "twenty", "uncle", "under",
    "upon", "wagon", "wait", "walking", "wasnt", "watch", "water", "weather",
    "west", "wheat", "where", "which", "wife", "wild", "win", "window",
    "winter", "without", "woman", "wont", "wool", "word", "working", "world",
    "would", "write", "wrong", "yard", "year", "yesterday", "across", "against",
    "answer", "awhile", "between", "board", "bottom", "breakfast", "broken",
    "build", "building", "built", "captain", "carried", "caught", "charge",
    "chicken", "circus", "cities", "clothes", "company", "couldnt", "country",
    "discover", "doctor", "doesnt", "dollar", "during", "eighth", "else",
    "enjoy", "enough", "everybody", "example", "except", "excuse", "field",
    "fifth", "finish", "following", "group", "happened", "harden", "havent",
    "heavy", "held", "hospital", "idea", "instead", "known", "laugh", "middle",
    "minute", "mountain", "ninth", "ocean", "office", "parent", "peanut",
    "pencil", "picnic", "police", "pretty", "prize", "quite", "radio", "raise",
    "really", "reason", "remember", "return", "saturday", "scare", "second",
    "since", "slowly", "stories", "student", "sudden", "suit", "sure",
    "swimming", "though", "threw", "tired", "together", "tomorrow", "toward",
    "tried", "trouble", "truly", "turtle", "until", "village", "visit", "wear",
    "whole", "whose", "women", "wouldnt", "writing", "written", "wrote",
    "yell", "young", "although", "america", "among", "arrive", "attention",
    "beautiful", "countries", "course", "cousin", "decide", "different",
    "evening", "favorite", "finally", "future", "happiest", "happiness",
    "important", "interest", "piece", "planet", "present", "president",
    "principal", "probably", "problem", "receive", "sentence", "several",
    "special", "suddenly", "suppose", "surely", "surprise", "through",
    "usually"
]

function MotionTest() {
    const [enemies, setEnemies] = useState([])
    const [shake, setShake] = useState(false)

    const [score, setScore] = useState(0)
    const [timeSurvived, setTimeSurvived] = useState(0)
    const [misses, setMisses] = useState(0)

    const [gameStarted, setGameStarted] = useState(false)
    const [gameOver, setGameOver] = useState(false)

    const [currentMode, setCurrentMode] = useState("easy")
    const [wordsDestroyed, setWordsDestroyed] = useState(0)
    const [stageWordsDestroyed, setStageWordsDestroyed] = useState(0)
    const [activeLanes, setActiveLanes] = useState(1)

    const [promptMessage, setPromptMessage] = useState("")
    const [activeEnemyId, setActiveEnemyId] = useState(null)
    const [typedIndex, setTypedIndex] = useState(0)

    const [finalScore, setFinalScore] = useState(0)
    const [combo, setCombo] = useState(0)
    const [maxCombo, setMaxCombo] = useState(0)
    const [wordHadMistake, setWordHadMistake] = useState(false)
    const [perfectWordsTyped, setPerfectWordsTyped] = useState(0)
    const [totalWordsCompleted, setTotalWordsCompleted] = useState(0)

    const promptTimeoutRef = useRef(null)

    const lanePositions = [35, 135, 235]
    const MAX_COMBO = 25

    const showPrompt = (message) => {
        setPromptMessage(message)

        if (promptTimeoutRef.current) {
            clearTimeout(promptTimeoutRef.current)
        }

        promptTimeoutRef.current = setTimeout(() => {
            setPromptMessage("")
        }, 1800)
    }

    const getCurrentDifficulty = () => {
        if (currentMode === "hard") return "Hard"
        if (currentMode === "medium") return "Medium"
        return "Easy"
    }

    const getCurrentWordList = () => {
        if (currentMode === "hard") {
            return allWords.filter((word) => word.length >= 9)
        }

        if (currentMode === "medium") {
            return allWords.filter((word) => word.length >= 5 && word.length <= 8)
        }

        return allWords.filter((word) => word.length >= 3 && word.length <= 4)
    }

    const getPointsForDifficulty = () => {
        if (currentMode === "hard") return 5
        if (currentMode === "medium") return 3
        return 1
    }

    const getComboMultiplier = (comboValue) => {
        if (comboValue >= 25) return 5
        if (comboValue >= 15) return 4
        if (comboValue >= 10) return 3
        if (comboValue >= 5) return 2
        return 1
    }

    const getEnemyDuration = () => {
        let baseDuration = 8

        if (currentMode === "medium") baseDuration = 6.5
        if (currentMode === "hard") baseDuration = 5

        const stageSpeedUp = Math.floor(stageWordsDestroyed / 8) * 0.5
        const duration = baseDuration - stageSpeedUp

        return Math.max(duration, 2)
    }

    const getSpawnRate = () => {
        let baseSpawnRate = 1600

        if (currentMode === "medium") baseSpawnRate = 1300
        if (currentMode === "hard") baseSpawnRate = 1000

        const stageSpawnBoost = Math.floor(stageWordsDestroyed / 10) * 100
        const spawnRate = baseSpawnRate - stageSpawnBoost

        return Math.max(spawnRate, 450)
    }

    const getDifficultyMultiplier = () => {
        if (currentMode === "hard") return 2.0
        if (currentMode === "medium") return 1.5
        return 1.0
    }

    const getLaneMultiplier = () => {
        if (activeLanes === 3) return 1.5
        if (activeLanes === 2) return 1.25
        return 1.0
    }

    const getStageMultiplier = () => {
        if (stageWordsDestroyed >= 30) return 1.3
        if (stageWordsDestroyed >= 10) return 1.15
        return 1.0
    }

    const getAccuracy = () => {
        if (totalWordsCompleted === 0) return 0
        return Math.round((perfectWordsTyped / totalWordsCompleted) * 100)
    }

    const calculateFinalScore = () => {
        const baseScore = score
        const difficultyMultiplier = getDifficultyMultiplier()
        const laneMultiplier = getLaneMultiplier()
        const stageMultiplier = getStageMultiplier()
        const timeBonus = timeSurvived * 2
        const wordsBonus = wordsDestroyed * 3
        const accuracyBonus = getAccuracy() * 5
        const comboBonus = maxCombo * 10

        return Math.floor(
            baseScore * difficultyMultiplier * laneMultiplier * stageMultiplier +
            timeBonus +
            wordsBonus +
            accuracyBonus +
            comboBonus
        )
    }

    const renderWord = (enemy) => {
        const isActive = enemy.id === activeEnemyId

        return enemy.word.split("").map((letter, index) => {
            let color = "white"

            if (isActive && index < typedIndex) {
                color = "#4caf50"
            } else if (isActive) {
                color = "#ffd54a"
            }

            return (
                <span key={`${enemy.id}-${index}`} style={{ color }}>
                    {letter}
                </span>
            )
        })
    }

    useEffect(() => {
        if (!gameStarted || gameOver) return

        const spawnInterval = setInterval(() => {
            setEnemies((prev) => {
                const currentWords = getCurrentWordList()
                const usedFirstLetters = new Set(
                    prev.map((enemy) => enemy.word[0].toLowerCase())
                )

                const availableWords = currentWords.filter(
                    (word) => !usedFirstLetters.has(word[0].toLowerCase())
                )

                if (availableWords.length === 0) {
                    return prev
                }

                const randomWord =
                    availableWords[Math.floor(Math.random() * availableWords.length)]

                const randomLane = Math.floor(Math.random() * activeLanes)

                const newEnemy = {
                    id: Date.now() + Math.random(),
                    word: randomWord,
                    lane: randomLane,
                }

                return [...prev, newEnemy]
            })
        }, getSpawnRate())

        return () => clearInterval(spawnInterval)
    }, [gameStarted, gameOver, currentMode, activeLanes, stageWordsDestroyed])

    useEffect(() => {
        if (!gameStarted || gameOver) return

        const timerInterval = setInterval(() => {
            setTimeSurvived((prev) => prev + 1)
        }, 1000)

        return () => clearInterval(timerInterval)
    }, [gameStarted, gameOver])

    useEffect(() => {
        if (misses >= 3) {
            setFinalScore(calculateFinalScore())
            setGameOver(true)
            setGameStarted(false)
            setPromptMessage("")
            setActiveEnemyId(null)
            setTypedIndex(0)
        }
    }, [
        misses,
        score,
        timeSurvived,
        wordsDestroyed,
        currentMode,
        activeLanes,
        stageWordsDestroyed,
        perfectWordsTyped,
        totalWordsCompleted,
        maxCombo,
    ])

    useEffect(() => {
        return () => {
            if (promptTimeoutRef.current) {
                clearTimeout(promptTimeoutRef.current)
            }
        }
    }, [])

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
        const pointsEarned = getPointsForDifficulty() * getComboMultiplier(newCombo)

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

        if (currentMode === "easy") {
            if (nextStageWordsDestroyed === 10) {
                setStageWordsDestroyed(nextStageWordsDestroyed)
                setActiveLanes(2)
                showPrompt("SECOND LANE OPEN")
                return
            }

            if (nextStageWordsDestroyed === 30) {
                setStageWordsDestroyed(nextStageWordsDestroyed)
                setActiveLanes(3)
                showPrompt("THIRD LANE OPEN")
                return
            }

            if (nextStageWordsDestroyed >= 50) {
                setCurrentMode("medium")
                setStageWordsDestroyed(0)
                setActiveLanes(1)
                setEnemies([])
                setActiveEnemyId(null)
                setTypedIndex(0)
                setWordHadMistake(false)
                showPrompt("MEDIUM MODE")
                return
            }

            setStageWordsDestroyed(nextStageWordsDestroyed)
            return
        }

        if (currentMode === "medium") {
            if (nextStageWordsDestroyed === 10) {
                setStageWordsDestroyed(nextStageWordsDestroyed)
                setActiveLanes(2)
                showPrompt("SECOND LANE OPEN")
                return
            }

            if (nextStageWordsDestroyed === 30) {
                setStageWordsDestroyed(nextStageWordsDestroyed)
                setActiveLanes(3)
                showPrompt("THIRD LANE OPEN")
                return
            }

            if (nextStageWordsDestroyed >= 50) {
                setCurrentMode("hard")
                setStageWordsDestroyed(0)
                setActiveLanes(1)
                setEnemies([])
                setActiveEnemyId(null)
                setTypedIndex(0)
                setWordHadMistake(false)
                showPrompt("HARD MODE")
                return
            }

            setStageWordsDestroyed(nextStageWordsDestroyed)
            return
        }

        if (nextStageWordsDestroyed === 10) {
            setStageWordsDestroyed(nextStageWordsDestroyed)
            setActiveLanes(2)
            showPrompt("SECOND LANE OPEN")
            return
        }

        if (nextStageWordsDestroyed === 30) {
            setStageWordsDestroyed(nextStageWordsDestroyed)
            setActiveLanes(3)
            showPrompt("THIRD LANE OPEN")
            return
        }

        setStageWordsDestroyed(nextStageWordsDestroyed)
    }

    const handleMissedEnemy = (id) => {
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

    useEffect(() => {
        if (!gameStarted || gameOver) return

        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase()

            if (key.length !== 1 || key < "a" || key > "z") return

            if (activeEnemyId === null) {
                const match = enemies.find(
                    (enemy) => enemy.word[0].toLowerCase() === key
                )

                if (match) {
                    setWordHadMistake(false)

                    if (match.word.length === 1) {
                        handleCorrectWord(match.id)
                    } else {
                        setActiveEnemyId(match.id)
                        setTypedIndex(1)
                    }
                }

                return
            }

            const activeEnemy = enemies.find((enemy) => enemy.id === activeEnemyId)

            if (!activeEnemy) {
                setActiveEnemyId(null)
                setTypedIndex(0)
                setWordHadMistake(false)
                return
            }

            const expectedLetter = activeEnemy.word[typedIndex]?.toLowerCase()

            if (key === expectedLetter) {
                const newTypedIndex = typedIndex + 1

                if (newTypedIndex >= activeEnemy.word.length) {
                    handleCorrectWord(activeEnemy.id)
                } else {
                    setTypedIndex(newTypedIndex)
                }
            } else {
                setWordHadMistake(true)
                setCombo(0)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [
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
    ])

    const startGame = () => {
        setEnemies([])
        setShake(false)
        setScore(0)
        setFinalScore(0)
        setTimeSurvived(0)
        setMisses(0)
        setGameOver(false)
        setGameStarted(true)

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

        showPrompt("EASY MODE")
    }

    const goToMainMenu = () => {
        setEnemies([])
        setShake(false)
        setScore(0)
        setFinalScore(0)
        setTimeSurvived(0)
        setMisses(0)
        setGameOver(false)
        setGameStarted(false)

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

        setPromptMessage("")
    }

    if (!gameStarted && !gameOver) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#050505",
                    color: "white",
                    padding: "20px",
                    boxSizing: "border-box",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "700px",
                        background: "#111",
                        border: "1px solid #2a2a2a",
                        borderRadius: "20px",
                        padding: "40px",
                        textAlign: "center",
                        boxShadow: "0 0 30px rgba(0,0,0,0.35)",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "56px",
                            margin: "0 0 20px 0",
                            color: "#ffd54a",
                        }}
                    >
                        Typing Survival
                    </h1>

                    <p
                        style={{
                            fontSize: "20px",
                            lineHeight: 1.6,
                            color: "#d5d5d5",
                            marginBottom: "35px",
                        }}
                    >
                        Type the incoming words before they reach the left side.
                        Build combo, survive the lane increases, and make it to hard mode.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "15px",
                            flexWrap: "wrap",
                        }}
                    >
                        <button
                            onClick={startGame}
                            style={{
                                padding: "14px 28px",
                                fontSize: "18px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                borderRadius: "12px",
                                border: "none",
                                background: "#ffd54a",
                                color: "#111",
                            }}
                        >
                            Start Game
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    if (gameOver) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#050505",
                    color: "white",
                    padding: "20px",
                    boxSizing: "border-box",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "760px",
                        background: "#111",
                        border: "1px solid #2a2a2a",
                        borderRadius: "20px",
                        padding: "40px",
                        boxShadow: "0 0 30px rgba(0,0,0,0.35)",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "54px",
                            margin: "0 0 10px 0",
                            textAlign: "center",
                            color: "#ffd54a",
                        }}
                    >
                        Game Over
                    </h2>

                    <p
                        style={{
                            textAlign: "center",
                            fontSize: "18px",
                            color: "#cfcfcf",
                            marginBottom: "30px",
                        }}
                    >
                        You made it to {getCurrentDifficulty()} mode.
                    </p>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "14px 30px",
                            fontSize: "18px",
                            lineHeight: 1.5,
                            marginBottom: "30px",
                        }}
                    >
                        <div>Base Score: {score}</div>
                        <div>Time Bonus: {timeSurvived * 2}</div>

                        <div>Words Bonus: {wordsDestroyed * 3}</div>
                        <div>Accuracy Bonus: {getAccuracy() * 5}</div>

                        <div>Combo Bonus: {maxCombo * 10}</div>
                        <div>Accuracy: {getAccuracy()}%</div>

                        <div>Perfect Words: {perfectWordsTyped}</div>
                        <div>Total Completed: {totalWordsCompleted}</div>

                        <div>Max Combo: {maxCombo}</div>
                        <div>Difficulty Multiplier: {getDifficultyMultiplier()}x</div>

                        <div>Lane Multiplier: {getLaneMultiplier()}x</div>
                        <div>Stage Multiplier: {getStageMultiplier()}x</div>
                    </div>

                    <div
                        style={{
                            textAlign: "center",
                            fontSize: "38px",
                            fontWeight: "bold",
                            color: "#ffd54a",
                            marginBottom: "30px",
                        }}
                    >
                        Final Score: {finalScore}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "15px",
                            flexWrap: "wrap",
                        }}
                    >
                        <button
                            onClick={startGame}
                            style={{
                                padding: "14px 24px",
                                fontSize: "18px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                borderRadius: "12px",
                                border: "none",
                                background: "#ffd54a",
                                color: "#111",
                            }}
                        >
                            Restart Run
                        </button>

                        <button
                            onClick={goToMainMenu}
                            style={{
                                padding: "14px 24px",
                                fontSize: "18px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                borderRadius: "12px",
                                border: "1px solid #3a3a3a",
                                background: "#1b1b1b",
                                color: "white",
                            }}
                        >
                            Main Menu
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <motion.div
            animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "relative" }}
        >
            {promptMessage && (
                <div
                    style={{
                        position: "absolute",
                        top: "45%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "42px",
                        fontWeight: "bold",
                        color: "#ffd54a",
                        pointerEvents: "none",
                        zIndex: 10,
                        textShadow: "0 0 12px rgba(0,0,0,0.8)",
                    }}
                >
                    {promptMessage}
                </div>
            )}

            <div
                style={{
                    position: "absolute",
                    top: "500px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 15,
                    textAlign: "center",
                    pointerEvents: "none",
                    minWidth: "220px",
                }}
            >
                <div
                    style={{
                        fontSize: combo >= 25 ? "100px" : combo >= 10 ? "75px" : "60px",
                        fontWeight: "bold",
                        color: combo >= 25 ? "#ff7043" : combo >= 10 ? "#ffb300" : "#ffd54a",
                        textShadow: "0 0 14px rgba(255, 180, 0, 0.7)",
                        lineHeight: 1,
                    }}
                >
                    Combo x{combo}
                </div>

                {combo >= 10 && (
                    <div
                        style={{
                            fontSize: "30px",
                            color: "#ffcc80",
                            marginTop: "4px",
                            letterSpacing: "1px",
                            lineHeight: 1,
                        }}
                    >
                        HOT STREAK
                    </div>
                )}
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                    color: "white",
                    gap: "20px",
                    flexWrap: "wrap",
                }}
            >
                <div
                    style={{
                        fontSize: "16px",
                        color: "#bdbdbd",
                        fontWeight: "bold",
                    }}
                >
                    Mode: {getCurrentDifficulty()}
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "24px",
                        fontSize: "22px",
                        fontWeight: "bold",
                        flexWrap: "wrap",
                        justifyContent: "flex-end",
                    }}
                >
                    <div>Score: {score}</div>
                    <div>Misses: {misses}/3</div>
                    <div>Time: {timeSurvived}s</div>
                </div>
            </div>

            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "330px",
                    overflow: "hidden",
                    marginTop: "20px",
                    borderTop: "1px solid #444",
                    borderBottom: "1px solid #444",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "100px",
                        left: 0,
                        width: "100%",
                        height: "1px",
                        backgroundColor: activeLanes >= 2 ? "#333" : "transparent",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        top: "200px",
                        left: 0,
                        width: "100%",
                        height: "1px",
                        backgroundColor: activeLanes >= 3 ? "#333" : "transparent",
                    }}
                />

                {enemies.map((enemy) => {
                    const isActive = enemy.id === activeEnemyId

                    return (
                        <motion.div
                            key={enemy.id}
                            initial={{ x: 2000 }}
                            animate={{ x: 0 }}
                            transition={{ duration: getEnemyDuration(), ease: "linear" }}
                            onAnimationComplete={() => handleMissedEnemy(enemy.id)}
                            style={{
                                position: "absolute",
                                top: `${lanePositions[enemy.lane]}px`,
                                fontSize: "24px",
                                fontWeight: "bold",
                                textShadow: isActive ? "0 0 10px rgba(255, 213, 74, 0.8)" : "none",
                                borderBottom: isActive ? "2px solid #ffd54a" : "none",
                                paddingBottom: "4px",
                            }}
                        >
                            {renderWord(enemy)}
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    )
}

export default MotionTest