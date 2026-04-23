import { useEffect } from "react"

function useGameInput({
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
                          onCorrectKey,
                          onWrongKey,
                          onWordComplete,
                      }) {
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
                    onCorrectKey?.()

                    if (match.word.length === 1) {
                        onWordComplete?.()
                        handleCorrectWord(match.id)
                    } else {
                        setActiveEnemyId(match.id)
                        setTypedIndex(1)
                    }
                } else {
                    onWrongKey?.()
                    setWordHadMistake(true)
                    setCombo(0)
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
                onCorrectKey?.()

                if (newTypedIndex >= activeEnemy.word.length) {
                    onWordComplete?.()
                    handleCorrectWord(activeEnemy.id)
                } else {
                    setTypedIndex(newTypedIndex)
                }
            } else {
                onWrongKey?.()
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
        setWordHadMistake,
        setActiveEnemyId,
        setTypedIndex,
        setCombo,
        handleCorrectWord,
        onCorrectKey,
        onWrongKey,
        onWordComplete,
    ])
}

export default useGameInput