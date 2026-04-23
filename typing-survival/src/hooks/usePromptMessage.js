import { useEffect, useRef, useState } from "react"

function usePromptMessage() {
    const [promptMessage, setPromptMessage] = useState("")
    const promptTimeoutRef = useRef(null)

    const showPrompt = (message) => {
        setPromptMessage(message)

        if (promptTimeoutRef.current) {
            clearTimeout(promptTimeoutRef.current)
        }

        promptTimeoutRef.current = setTimeout(() => {
            setPromptMessage("")
        }, 1800)
    }

    const clearPrompt = () => {
        setPromptMessage("")

        if (promptTimeoutRef.current) {
            clearTimeout(promptTimeoutRef.current)
            promptTimeoutRef.current = null
        }
    }

    useEffect(() => {
        return () => {
            if (promptTimeoutRef.current) {
                clearTimeout(promptTimeoutRef.current)
            }
        }
    }, [])

    return {
        promptMessage,
        setPromptMessage,
        showPrompt,
        clearPrompt,
    }
}

export default usePromptMessage