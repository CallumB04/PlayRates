const games = require("../data/games.json");

const express = require("express");
const router = express.Router();

// all games
router.get("/", (req, res) => {
    try {
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: "Error fetching games" }); // internal server error
    }
});

// get game from id
router.get("/:id", (req, res) => {
    try {
        const { id } = req.params; // get id from URL

        const game = games.find((game) => String(game.id) === id);

        if (game) {
            res.status(200).json(game);
        } else {
            res.status(404).json({ message: "Game not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching game" }); // internal server error
    }
});

module.exports = router;
