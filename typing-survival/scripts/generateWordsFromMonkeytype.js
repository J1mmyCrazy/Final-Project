import fs from "fs"

const raw = fs.readFileSync("./src/data/english_25k.json", "utf8")
const parsed = JSON.parse(raw)

// clean + filter
const cleanWords = parsed.words
    .map((w) => w.trim().toLowerCase())
    .filter((w) => /^[a-z]+$/.test(w))
    .filter((w) => w.length >= 3 && w.length <= 12)
    .filter((w) => !/(.)\1\1/.test(w))
    .filter((w) => !w.includes("qz") && !w.includes("zx"))

const uniqueWords = [...new Set(cleanWords)]

const output = `export const allWords = ${JSON.stringify(uniqueWords, null, 2)};\n`

fs.writeFileSync("./src/data/words.js", output)

console.log(`Generated ${uniqueWords.length} words`)