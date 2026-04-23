const express = require("express");
const router = express.Router();

const {
    getLeaderboard,
    submitScore,
} = require("../controllers/leaderboard");

router.get("/", getLeaderboard);
router.post("/", submitScore);

module.exports = router;