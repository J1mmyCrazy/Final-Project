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
    const [input, setInput] = useState("")
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
    const promptTimeoutRef = useRef(null)

    const lanePositions = [35, 135, 235]
    const [finalScore, setFinalScore] = useState(0)


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

    const getEnemyDuration = () => {
        let baseDuration = 12

        if (currentMode === "medium") baseDuration = 10
        if (currentMode === "hard") baseDuration = 8

        const stageSpeedUp = Math.floor(stageWordsDestroyed / 10)
        const duration = baseDuration - stageSpeedUp

        return Math.max(duration, 4)
    }

    useEffect(() => {
        if (!gameStarted || gameOver) return

        const spawnInterval = setInterval(() => {
            const currentWords = getCurrentWordList()
            const randomWord =
                currentWords[Math.floor(Math.random() * currentWords.length)]

            const randomLane = Math.floor(Math.random() * activeLanes)

            const newEnemy = {
                id: Date.now() + Math.random(),
                word: randomWord,
                lane: randomLane,
            }

            setEnemies((prev) => [...prev, newEnemy])
        }, 2000)

        return () => clearInterval(spawnInterval)
    }, [gameStarted, gameOver, currentMode, activeLanes])

    useEffect(() => {
        if (!gameStarted || gameOver) return

        const timerInterval = setInterval(() => {
            setTimeSurvived((prev) => prev + 1)
        }, 1000)

        return () => clearInterval(timerInterval)
    }, [gameStarted, gameOver])

    useEffect(() => {
        if (misses >= 3) {
            const final = calculateFinalScore()
            setFinalScore(final)

            setGameOver(true)
            setGameStarted(false)
            setPromptMessage("")
        }
    }, [misses])

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
        setScore((prev) => prev + getPointsForDifficulty())

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
                showPrompt("HARD MODE")
                return
            }

            setStageWordsDestroyed(nextStageWordsDestroyed)
            return
        }

        // hard mode = final endless phase
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

    const handleSubmit = (e) => {
        if (e.key === "Enter") {
            const trimmedInput = input.trim().toLowerCase()

            const match = enemies.find(
                (enemy) => enemy.word.toLowerCase() === trimmedInput
            )

            if (match) {
                handleCorrectWord(match.id)
            } else if (trimmedInput !== "") {
                triggerShake()
            }

            setInput("")
        }
    }

    const handleMissedEnemy = (id) => {
        removeEnemy(id)
        triggerShake()
        setMisses((prev) => prev + 1)
    }

    const startGame = () => {
        setEnemies([])
        setInput("")
        setShake(false)
        setScore(0)
        setTimeSurvived(0)
        setMisses(0)
        setGameOver(false)
        setGameStarted(true)

        setCurrentMode("easy")
        setWordsDestroyed(0)
        setStageWordsDestroyed(0)
        setActiveLanes(1)
        setFinalScore(0)

        showPrompt("EASY MODE")
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

    const calculateFinalScore = () => {
        const baseScore = score
        const difficultyMultiplier = getDifficultyMultiplier()
        const laneMultiplier = getLaneMultiplier()
        const stageMultiplier = getStageMultiplier()
        const timeBonus = timeSurvived * 2
        const wordsBonus = wordsDestroyed * 3

        return Math.floor(
            baseScore * difficultyMultiplier * laneMultiplier * stageMultiplier +
            timeBonus +
            wordsBonus
        )
    }

    if (!gameStarted && !gameOver) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "80vh",
                    color: "white",
                }}
            >
                <h2 style={{ fontSize: "48px", marginBottom: "20px" }}>
                    Typing Survival
                </h2>
                <p style={{ fontSize: "20px", marginBottom: "30px" }}>
                    Type the words before they reach the left side.
                </p>
                <button
                    onClick={startGame}
                    style={{
                        padding: "12px 24px",
                        fontSize: "18px",
                        cursor: "pointer",
                    }}
                >
                    Start Game
                </button>
            </div>
        )
    }

    if (gameOver) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "80vh",
                    color: "white",
                }}
            >
                <h2 style={{ fontSize: "48px", marginBottom: "20px" }}>Game Over</h2>
                <p>Base Score: {score}</p>
                <p>Time Bonus: {timeSurvived * 2}</p>
                <p>Words Bonus: {wordsDestroyed * 3}</p>

                <p>Difficulty Multiplier: {getDifficultyMultiplier()}x</p>
                <p>Lane Multiplier: {getLaneMultiplier()}x</p>
                <p>Stage Multiplier: {getStageMultiplier()}x</p>

                <p style={{ fontSize: "28px", marginTop: "10px" }}>
                    Final Score: {finalScore}
                </p>
                <p style={{ fontSize: "24px", marginBottom: "10px" }}>
                    Time Survived: {timeSurvived}s
                </p>
                <p style={{ fontSize: "24px", marginBottom: "10px" }}>
                    Words Destroyed: {wordsDestroyed}
                </p>
                <p style={{ fontSize: "24px", marginBottom: "30px" }}>
                    Difficulty Reached: {getCurrentDifficulty()}
                </p>
                <button
                    onClick={startGame}
                    style={{
                        padding: "12px 24px",
                        fontSize: "18px",
                        cursor: "pointer",
                    }}
                >
                    Play Again
                </button>
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
                    display: "flex",
                    gap: "30px",
                    marginBottom: "20px",
                    color: "white",
                    fontSize: "24px",
                    fontWeight: "bold",
                    flexWrap: "wrap",
                }}
            >
                <div>Score: {score}</div>
                <div>Time: {timeSurvived}s</div>
                <div>Misses: {misses}/3</div>
                <div>Mode: {getCurrentDifficulty()}</div>
                <div>Lanes: {activeLanes}</div>
                <div>Destroyed: {wordsDestroyed}</div>
                <div>Stage: {stageWordsDestroyed}/50</div>
            </div>

            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleSubmit}
                placeholder="type word..."
                style={{
                    padding: "10px",
                    fontSize: "18px",
                    marginBottom: "20px",
                }}
            />

            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "330px",
                    overflow: "hidden",
                    marginTop: "40px",
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

                {enemies.map((enemy) => (
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
                            color: "white",
                        }}
                    >
                        {enemy.word}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default MotionTest