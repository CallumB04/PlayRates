const games = require("../data/games.json");

const express = require("express");
const router = express.Router();

// all games
router.get("/", (req, res) => {
    res.json(games);
});

// get game from id
router.get("/:id", (req, res) => {
    const { id } = req.params; // get id from URL

    const game = games.find((game) => String(game.id) === id);

    if (game) {
        res.json(game);
    } else {
        res.status(404).send("Game not found");
    }
});

module.exports = router;
