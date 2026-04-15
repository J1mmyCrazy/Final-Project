import { motion } from "motion/react"
import { useEffect, useState } from "react"

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
    const [gameStarted, setGameStarted] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [misses, setMisses] = useState(0)

    const getCurrentDifficulty = () => {
        if (score >= 60) return "Hard"
        if (score >= 15) return "Medium"
        return "Easy"
    }

    const getCurrentWordList = () => {
        if (score >= 60) {
            return allWords.filter((word) => word.length >= 9)
        }

        if (score >= 15) {
            return allWords.filter((word) => word.length >= 5 && word.length <= 8)
        }

        return allWords.filter((word) => word.length >= 3 && word.length <= 4)
    }

    const getPointsForDifficulty = () => {
        if (score >= 60) return 5
        if (score >= 15) return 3
        return 1
    }

    useEffect(() => {
        if (!gameStarted || gameOver) return

        const spawnInterval = setInterval(() => {
            const currentWords = getCurrentWordList()
            const randomWord =
                currentWords[Math.floor(Math.random() * currentWords.length)]

            const newEnemy = {
                id: Date.now() + Math.random(),
                word: randomWord,
            }

            setEnemies((prev) => [...prev, newEnemy])
        }, 2000)

        return () => clearInterval(spawnInterval)
    }, [gameStarted, gameOver, score])

    useEffect(() => {
        if (!gameStarted || gameOver) return

        const timerInterval = setInterval(() => {
            setTimeSurvived((prev) => prev + 1)
        }, 1000)

        return () => clearInterval(timerInterval)
    }, [gameStarted, gameOver])

    useEffect(() => {
        if (misses >= 3) {
            setGameOver(true)
            setGameStarted(false)
        }
    }, [misses])

    const removeEnemy = (id) => {
        setEnemies((prev) => prev.filter((enemy) => enemy.id !== id))
    }

    const triggerShake = () => {
        setShake(true)

        setTimeout(() => {
            setShake(false)
        }, 300)
    }

    const handleSubmit = (e) => {
        if (e.key === "Enter") {
            const trimmedInput = input.trim().toLowerCase()

            const match = enemies.find(
                (enemy) => enemy.word.toLowerCase() === trimmedInput
            )

            if (match) {
                removeEnemy(match.id)
                setScore((prev) => prev + getPointsForDifficulty())
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
    }

    const getEnemyDuration = () => {
        const speedLevel = Math.floor(score / 5)
        const duration = 12 - speedLevel
        return Math.max(duration, 4)
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
                <p style={{ fontSize: "24px", marginBottom: "10px" }}>
                    Final Score: {score}
                </p>
                <p style={{ fontSize: "24px", marginBottom: "10px" }}>
                    Time Survived: {timeSurvived}s
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
        >
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
                <div>Speed Level: {Math.floor(score / 5)}</div>
                <div>Difficulty: {getCurrentDifficulty()}</div>
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
                    height: "200px",
                    overflow: "hidden",
                    marginTop: "40px",
                }}
            >
                {enemies.map((enemy) => (
                    <motion.div
                        key={enemy.id}
                        initial={{ x: 2000 }}
                        animate={{ x: 0 }}
                        transition={{ duration: getEnemyDuration(), ease: "linear" }}
                        onAnimationComplete={() => handleMissedEnemy(enemy.id)}
                        style={{
                            position: "absolute",
                            top: "50px",
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