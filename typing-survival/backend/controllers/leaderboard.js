const Score = require("../models/Score");

const getLeaderboard = async (req, res) => {
    try {
        const scores = await Score.find({})
            .sort({ score: -1, createdAt: 1 })
            .limit(10);

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

        name = name.trim();

        if (!name || name.length > 20 || score < 0) {
            return res.status(400).json({ error: "Invalid name or score" });
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