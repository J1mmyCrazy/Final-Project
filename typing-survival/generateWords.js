import fs from "fs"
import wordListPath from "word-list"

// read raw words
const rawWords = fs.readFileSync(wordListPath, "utf8").split("\n")

// clean + filter
const cleanWords = rawWords
    .map(w => w.trim().toLowerCase())
    .filter(w => /^[a-z]+$/.test(w))        // only letters
    .filter(w => w.length >= 3 && w.length <= 12) // allow long words
    .filter(w => !/(.)\1\1/.test(w))        // no aaa, iii, etc.
    .filter(w => !w.includes("qz") && !w.includes("zx"))

// optional: remove duplicates (just in case)
const uniqueWords = [...new Set(cleanWords)]

// format as JS file
const output = `export const allWords = ${JSON.stringify(uniqueWords, null, 2)};\n`

// write to frontend
fs.writeFileSync("./src/data/words.js", output)

console.log(`Generated ${uniqueWords.length} words`)