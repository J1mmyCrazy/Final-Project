const Suggestion = require("../models/Suggestion");

const submitSuggestion = async (req, res) => {
    try {
        let { message } = req.body;

        if (typeof message !== "string") {
            return res.status(400).json({ error: "Suggestion must be text" });
        }

        message = message.trim();

        if (!message || message.length > 500) {
            return res.status(400).json({ error: "Invalid suggestion" });
        }

        const newSuggestion = new Suggestion({ message });
        const savedSuggestion = await newSuggestion.save();

        res.status(201).json(savedSuggestion);
    } catch (error) {
        res.status(500).json({ error: "Failed to save suggestion" });
    }
};

const getSuggestions = async (req, res) => {
    try {
        const suggestions = await Suggestion.find({})
            .sort({ createdAt: -1 })
            .limit(100)
            .select("message -_id")

        const formatted = suggestions.map((s, index) => {
            return `<div>Suggestion ${index + 1}: ${s.message}</div>`
        })

        res.send(`
            <html>
                <body style="background:#111;color:white;font-family:sans-serif;padding:20px;">
                    ${formatted.join("")}
                </body>
            </html>
        `)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch suggestions" })
    }
};

module.exports = {
    submitSuggestion,
    getSuggestions,
};