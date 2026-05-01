const express = require("express")
const router = express.Router()

const {
    submitSuggestion,
    getSuggestions,
} = require("../controllers/suggestions")

router.post("/", submitSuggestion)
router.get("/", getSuggestions)

module.exports = router