import { useEffect, useRef } from "react"

export default function useGameAudio() {
    const correctKeyRef = useRef(null)
    const wrongKeyRef = useRef(null)
    const wordCompleteRef = useRef(null)
    const missRef = useRef(null)

    const musicA = useRef(null)
    const musicB = useRef(null)

    const playlistRef = useRef([])
    const currentTrackIndexRef = useRef(0)
    const currentPlayerRef = useRef("A")
    const fadeIntervalRef = useRef(null)
    const crossfadeIntervalRef = useRef(null)
    const isCrossfadingRef = useRef(false)

    const gameMusicVolume = 0.15
    const menuMusicVolume = 0.12
    const fadeDuration = 6000

    useEffect(() => {
        correctKeyRef.current = new Audio("/audio/correct-key.wav")
        wrongKeyRef.current = new Audio("/audio/wrong-key.wav")
        wordCompleteRef.current = new Audio("/audio/word-complete.wav")
        missRef.current = new Audio("/audio/miss.wav")

        correctKeyRef.current.volume = 0.25
        wrongKeyRef.current.volume = 0.25
        wordCompleteRef.current.volume = 0.35
        missRef.current.volume = 0.35

        musicA.current = new Audio()
        musicB.current = new Audio()

        musicA.current.preload = "auto"
        musicB.current.preload = "auto"

        musicA.current.volume = 0
        musicB.current.volume = 0

        playlistRef.current = [
            "/audio/background1.mp3",
            "/audio/background2.mp3",
            "/audio/background3.mp3",
            "/audio/background4.mp3",
        ]

        return () => {
            clearMusicTimers()

            ;[musicA.current, musicB.current].forEach((audio) => {
                if (!audio) return
                audio.pause()
                audio.currentTime = 0
                audio.src = ""
            })
        }
    }, [])

    const clearMusicTimers = () => {
        if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current)
            fadeIntervalRef.current = null
        }

        if (crossfadeIntervalRef.current) {
            clearInterval(crossfadeIntervalRef.current)
            crossfadeIntervalRef.current = null
        }

        isCrossfadingRef.current = false
    }

    const resetMusicPlayers = () => {
        clearMusicTimers()

        ;[musicA.current, musicB.current].forEach((audio) => {
            if (!audio) return
            audio.pause()
            audio.currentTime = 0
            audio.loop = false
            audio.volume = 0
            audio.src = ""
        })

        currentPlayerRef.current = "A"
    }

    const playFromStart = (audioRef) => {
        const audio = audioRef.current
        if (!audio) return

        const clone = audio.cloneNode()
        clone.volume = audio.volume
        clone.play().catch(() => {})
    }

    const playCorrectKey = () => playFromStart(correctKeyRef)
    const playWrongKey = () => playFromStart(wrongKeyRef)
    const playWordComplete = () => playFromStart(wordCompleteRef)
    const playMiss = () => playFromStart(missRef)

    const getCurrentPlayer = () =>
        currentPlayerRef.current === "A" ? musicA.current : musicB.current

    const getNextPlayer = () =>
        currentPlayerRef.current === "A" ? musicB.current : musicA.current

    const crossfadeToNext = async () => {
        if (isCrossfadingRef.current) return

        const current = getCurrentPlayer()
        const next = getNextPlayer()

        if (!current || !next || playlistRef.current.length === 0) return

        isCrossfadingRef.current = true

        currentTrackIndexRef.current =
            (currentTrackIndexRef.current + 1) % playlistRef.current.length

        const nextTrack = playlistRef.current[currentTrackIndexRef.current]

        next.pause()
        next.currentTime = 0
        next.src = nextTrack
        next.loop = false
        next.volume = 0
        next.load()

        try {
            await next.play()
        } catch {
            isCrossfadingRef.current = false
            return
        }

        const steps = 60
        const stepTime = fadeDuration / steps
        let step = 0

        if (crossfadeIntervalRef.current) {
            clearInterval(crossfadeIntervalRef.current)
        }

        crossfadeIntervalRef.current = setInterval(() => {
            step++

            const progress = step / steps

            current.volume = gameMusicVolume * (1 - progress)
            next.volume = gameMusicVolume * progress

            if (step >= steps) {
                clearInterval(crossfadeIntervalRef.current)
                crossfadeIntervalRef.current = null

                current.pause()
                current.currentTime = 0
                current.volume = 0

                next.volume = gameMusicVolume
                currentPlayerRef.current =
                    currentPlayerRef.current === "A" ? "B" : "A"

                isCrossfadingRef.current = false
            }
        }, stepTime)
    }

    const startGameMusic = async () => {
        resetMusicPlayers()

        const player = musicA.current
        if (!player || playlistRef.current.length === 0) return

        currentTrackIndexRef.current = Math.floor(
            Math.random() * playlistRef.current.length
        )

        player.src = playlistRef.current[currentTrackIndexRef.current]
        player.loop = false
        player.volume = gameMusicVolume
        player.load()

        try {
            await player.play()
        } catch {
            return
        }

        fadeIntervalRef.current = setInterval(() => {
            const activePlayer = getCurrentPlayer()

            if (!activePlayer || !activePlayer.duration || isCrossfadingRef.current) {
                return
            }

            const timeLeft = activePlayer.duration - activePlayer.currentTime

            if (timeLeft <= fadeDuration / 1000) {
                crossfadeToNext()
            }
        }, 250)

        player.onended = () => {
            if (!isCrossfadingRef.current) {
                crossfadeToNext()
            }
        }
    }

    const startMenuMusic = async () => {
        resetMusicPlayers()

        const player = musicA.current
        if (!player) return

        player.src = "/audio/mainMenu.mp3"
        player.loop = true
        player.volume = menuMusicVolume
        player.load()

        try {
            await player.play()
        } catch {}
    }

    const stopMusic = () => {
        resetMusicPlayers()
    }

    return {
        playCorrectKey,
        playWrongKey,
        playWordComplete,
        playMiss,
        startGameMusic,
        startMenuMusic,
        stopMusic,
    }
}