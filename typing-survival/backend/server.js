require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });

app.get("/", (req, res) => {
    res.send("Typing Survival backend is running");
});

app.use("/api/leaderboard", leaderboardRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "unknown endpoint" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});