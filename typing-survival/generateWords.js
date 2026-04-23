import fs from "fs"

const inputPath = "./src/data/english_5k.json"
const outputPath = "./src/data/words.js"

const raw = fs.readFileSync(inputPath, "utf8")
const parsed = JSON.parse(raw)

if (!parsed.words || !Array.isArray(parsed.words)) {
    throw new Error("JSON file must contain a words array")
}

const cleanWords = parsed.words
    .map((w) => w.trim().toLowerCase())
    .filter((w) => /^[a-z]+$/.test(w))          // only letters
    .filter((w) => w.length >= 3 && w.length <= 12)
    .filter((w) => !/(.)\1\1/.test(w))          // no aaa, iii, etc.
    .filter((w) => !w.includes("qz") && !w.includes("zx"))

const uniqueWords = [...new Set(cleanWords)]

const output = `export const allWords = ${JSON.stringify(uniqueWords, null, 2)};\n`

fs.writeFileSync(outputPath, output)

console.log(`Generated ${uniqueWords.length} words from ${inputPath}`)