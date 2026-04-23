javascript
import { useEffect, useRef } from "react"

// Custom React hook that manages short SFX and background music with crossfading.
// Provides play helpers for key/miss/word sounds and controls to start/stop menu or game music.
export default function useGameAudio() {
    // Refs for one-shot SFX audio elements (we clone them when playing so overlapping is allowed).
    const correctKeyRef = useRef(null)
    const wrongKeyRef = useRef(null)
    const wordCompleteRef = useRef(null)
    const missRef = useRef(null)

    // Two audio players used to crossfade between background tracks (A/B).
    const musicA = useRef(null)
    const musicB = useRef(null)

    // Playlist and player state refs to persist across renders without causing re-renders.
    const playlistRef = useRef([])
    const currentTrackIndexRef = useRef(0)
    const currentPlayerRef = useRef("A")
    const fadeIntervalRef = useRef(null)
    const crossfadeIntervalRef = useRef(null)

    // Volume and timing configuration for music and fades.
    const gameMusicVolume = 0.15
    const menuMusicVolume = 0.12
    const fadeDuration = 6000 // milliseconds used for crossfade window

    // Handler that will be attached to audio 'ended' to ensure we advance when metadata/duration is missing.
    const handleTrackEnded = () => {
        crossfadeToNext()
    }

    useEffect(() => {
        // Initialize SFX audio instances and configure base volumes.
        correctKeyRef.current = new Audio("/audio/correct-key.wav")
        wrongKeyRef.current = new Audio("/audio/wrong-key.wav")
        wordCompleteRef.current = new Audio("/audio/word-complete.wav")
        missRef.current = new Audio("/audio/miss.wav")

        correctKeyRef.current.volume = 0.9
        wrongKeyRef.current.volume = 0.9
        wordCompleteRef.current.volume = 0.8
        missRef.current.volume = 0.75

        // Create the two music players used for crossfading.
        musicA.current = new Audio()
        musicB.current = new Audio()

        // Set initial volumes: primary player at game music volume, secondary muted.
        musicA.current.volume = gameMusicVolume
        musicB.current.volume = 0

        // Populate the playlist for in-game background tracks.
        playlistRef.current = [
            "/audio/background1.mp3",
            "/audio/background2.mp3",
            "/audio/background3.mp3",
            "/audio/background4.mp3",
        ]

        // Cleanup on unmount: clear timers, remove listeners and stop/pause any playing audio.
        return () => {
            clearMusicTimers()

            ;[musicA.current, musicB.current].forEach((audio) => {
                if (!audio) return
                audio.removeEventListener("ended", handleTrackEnded)
                audio.pause()
                audio.currentTime = 0
            })
        }
    }, [])

    // Clear any running fade/crossfade intervals to avoid multiple timers running.
    const clearMusicTimers = () => {
        if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current)
            fadeIntervalRef.current = null
        }

        if (crossfadeIntervalRef.current) {
            clearInterval(crossfadeIntervalRef.current)
            crossfadeIntervalRef.current = null
        }
    }

    // Reset both music players to a clean state (stop, reset time, clear src, mute).
    const resetMusicPlayers = () => {
        clearMusicTimers()

        ;[musicA.current, musicB.current].forEach((audio) => {
            if (!audio) return
            audio.removeEventListener("ended", handleTrackEnded)
            audio.pause()
            audio.currentTime = 0
            audio.loop = false
            audio.volume = 0
            audio.src = ""
        })

        currentPlayerRef.current = "A"
    }

    // Play a cloned copy of a one-shot SFX so overlapping sounds are possible.
    const playFromStart = (audioRef) => {
        const audio = audioRef.current
        if (!audio) return

        const clone = audio.cloneNode()
        clone.volume = audio.volume
        clone.play().catch(() => {})
    }

    // Public SFX helpers used elsewhere in the app.
    const playCorrectKey = () => playFromStart(correctKeyRef)
    const playWrongKey = () => playFromStart(wrongKeyRef)
    const playWordComplete = () => playFromStart(wordCompleteRef)
    const playMiss = () => playFromStart(missRef)

    // Crossfade logic: prepare the next player, start it muted, then incrementally swap volumes.
    const crossfadeToNext = () => {
        const current =
            currentPlayerRef.current === "A" ? musicA.current : musicB.current

        const next =
            currentPlayerRef.current === "A" ? musicB.current : musicA.current

        if (!current || !next || playlistRef.current.length === 0) return

        // ensure any existing crossfade interval cleared
        if (crossfadeIntervalRef.current) {
            clearInterval(crossfadeIntervalRef.current)
            crossfadeIntervalRef.current = null
        }

        // Advance to next track index (wraps).
        currentTrackIndexRef.current =
            (currentTrackIndexRef.current + 1) % playlistRef.current.length

        const nextTrack = playlistRef.current[currentTrackIndexRef.current]

        // Ensure next player is stopped and reset, then assign new src and start playback muted.
        next.removeEventListener("ended", handleTrackEnded)
        next.pause()
        next.currentTime = 0
        next.src = nextTrack
        next.loop = false
        next.volume = 0

        // Attach ended handler in case metadata doesn't load before the track ends.
        next.addEventListener("ended", handleTrackEnded)

        next.play().catch(() => {})

        // Perform the crossfade over several steps for a smooth transition.
        const steps = 60
        const stepTime = fadeDuration / steps
        let step = 0

        crossfadeIntervalRef.current = setInterval(() => {
            step++

            const progress = step / steps

            current.volume = gameMusicVolume * (1 - progress)
            next.volume = gameMusicVolume * progress

            if (step >= steps) {
                clearInterval(crossfadeIntervalRef.current)
                crossfadeIntervalRef.current = null

                // Finalize switch: stop current player, set next as active and restore volume.
                current.pause()
                current.currentTime = 0
                current.volume = 0

                next.volume = gameMusicVolume
                currentPlayerRef.current =
                    currentPlayerRef.current === "A" ? "B" : "A"
            }
        }, stepTime)
    }

    // Start in-game music playback: pick a random track and monitor remaining time to trigger crossfade.
    const startGameMusic = () => {
        resetMusicPlayers()

        const player = musicA.current
        if (!player || playlistRef.current.length === 0) return

        currentTrackIndexRef.current = Math.floor(
            Math.random() * playlistRef.current.length
        )

        player.src = playlistRef.current[currentTrackIndexRef.current]
        player.loop = false
        player.volume = gameMusicVolume

        // Attach ended handler so we still advance if metadata/duration isn't available.
        player.removeEventListener("ended", handleTrackEnded)
        player.addEventListener("ended", handleTrackEnded)

        player.play().catch(() => {})

        // Periodically check time left on active player and initiate crossfade when within fade window.
        fadeIntervalRef.current = setInterval(() => {
            const activePlayer =
                currentPlayerRef.current === "A" ? musicA.current : musicB.current

            if (!activePlayer) return

            // If duration is available, use it to preemptively crossfade.
            const duration = activePlayer.duration
            if (duration && isFinite(duration)) {
                const timeLeft = duration - activePlayer.currentTime
                if (timeLeft <= fadeDuration / 1000) {
                    crossfadeToNext()
                }
            }
            // If duration is not available yet, rely on the 'ended' event to progress to next track.
        }, 500)
    }

    // Start menu music: uses a single looping menu track (no crossfade).
    const startMenuMusic = () => {
        resetMusicPlayers()

        const player = musicA.current
        if (!player) return

        player.src = "/audio/mainMenu.mp3"
        player.loop = true
        player.volume = menuMusicVolume

        // remove any previous ended listener for menu looping track
        player.removeEventListener("ended", handleTrackEnded)

        player.play().catch(() => {})
    }

    // Stop and reset music players immediately.
    const stopMusic = () => {
        resetMusicPlayers()
    }

    // Expose the audio controls for other parts of the app to call.
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