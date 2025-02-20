const games = require("../data/games.json");

const express = require("express");
const router = express.Router();

// all games
router.get("/", (req, res) => {
    try {
        res.json(games);
    } catch (error) {
        res.status(500); // internal server error
    }
});

// get game from id
router.get("/:id", (req, res) => {
    try {
        const { id } = req.params; // get id from URL

        const game = games.find((game) => String(game.id) === id);

        if (game) {
            res.json(game);
        } else {
            res.status(404).send("Game not found");
        }
    } catch (error) {
        res.status(500); // internal server error
    }
});

module.exports = router;
