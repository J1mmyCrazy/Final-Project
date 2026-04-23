import { motion } from "motion/react"

// GameArena: renders moving enemy words across lanes and handles miss callbacks.
// Props:
//  - shake: boolean triggering a brief arena shake animation
//  - enemies: array of enemy objects { id, word, lane, ... }
//  - activeEnemyId: id of the enemy the player is currently typing
//  - typedIndex: how many letters of the active enemy have been typed
//  - lanePositions: pixel Y positions for lanes
//  - activeLanes: number of lanes currently enabled (not directly used here but available)
//  - getEnemyDuration: function(mode, stageWordsDestroyed) => seconds for enemy to traverse
//  - currentMode, stageWordsDestroyed: used to compute duration
//  - handleMissedEnemy: callback invoked when enemy animation completes (i.e., reaches player)
function GameArena({
                       shake,
                       enemies,
                       activeEnemyId,
                       typedIndex,
                       lanePositions,
                       activeLanes,
                       getEnemyDuration,
                       currentMode,
                       stageWordsDestroyed,
                       handleMissedEnemy,
                   }) {
    // renderWord: returns an array of <span> for each letter with color based on typing progress.
    const renderWord = (enemy) => {
        const isActive = enemy.id === activeEnemyId

        return enemy.word.split("").map((letter, index) => {
            let color = "#f8fafc"

            // letters already typed correctly are green; remaining active letters have a highlight color.
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

    return (
        // Outer motion wrapper supports a brief horizontal shake when 'shake' is true.
        <motion.div
            animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "620px",
                    overflow: "hidden",
                    marginTop: "90px",
                }}
            >
                {enemies.map((enemy) => {
                    const isActive = enemy.id === activeEnemyId

                    return (
                        // Each enemy uses motion.div to animate from off-screen to the player.
                        // onAnimationComplete is used to signal a miss when the animation finishes.
                        <motion.div
                            key={enemy.id}
                            initial={{ x: 2000 }}
                            animate={{ x: 0 }}
                            transition={{
                                duration: getEnemyDuration(currentMode, stageWordsDestroyed),
                                ease: "linear",
                            }}
                            onAnimationComplete={() => handleMissedEnemy(enemy.id)}
                            style={{
                                position: "absolute",
                                top: `${lanePositions[enemy.lane]}px`,
                                fontSize: isActive ? "56px" : "48px",
                                fontWeight: 800,
                                letterSpacing: "1px",
                                lineHeight: 1,
                                textShadow: isActive
                                    ? "0 0 18px rgba(255, 213, 74, 0.9)"
                                    : "0 0 10px rgba(255,255,255,0.16)",
                                borderBottom: isActive ? "3px solid #ffd54a" : "none",
                                paddingBottom: "8px",
                                whiteSpace: "nowrap",
                                userSelect: "none",
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

export default GameArena