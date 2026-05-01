const Score = require("../models/Score");
const badWords = require("../data/badWords.json");

const normalizeName = (name) => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
};

const containsProfanity = (name) => {
    const normalized = normalizeName(name);

    return badWords.some((word) => {
        const normalizedWord = word.toLowerCase().replace(/[^a-z0-9]/g, "");
        return normalizedWord && normalized.includes(normalizedWord);
    });
};

const getLeaderboard = async (req, res) => {
    try {
        const { type = "all-time", limit = 10 } = req.query;

        const maxLimit = Math.min(Number(limit) || 10, 50);

        let filter = {};

        if (type === "weekly") {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            filter = {
                createdAt: { $gte: oneWeekAgo },
            };
        }

        const scores = await Score.find(filter)
            .sort({ score: -1, createdAt: 1 })
            .limit(maxLimit);

        res.json(scores);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
};

const submitScore = async (req, res) => {
    try {
        let { name, score } = req.body;

        if (typeof name !== "string" || typeof score !== "number") {
            return res.status(400).json({
                error: "Name must be a string and score must be a number",
            });
        }

        name = name.trim().replace(/[^a-zA-Z0-9]/g, "").slice(0, 12);

        if (!name || score < 0) {
            return res.status(400).json({ error: "Invalid name or score" });
        }

        if (containsProfanity(name)) {
            return res.status(400).json({ error: "Inappropriate name not allowed" });
        }

        const newScore = new Score({
            name,
            score,
        });

        const savedScore = await newScore.save();
        res.status(201).json(savedScore);
    } catch (error) {
        res.status(500).json({ error: "Failed to save score" });
    }
};

module.exports = {
    getLeaderboard,
    submitScore,
};