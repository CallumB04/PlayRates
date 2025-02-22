const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

// using file path and fs.readFile for data retrieval, instead of require(), as games.json will change during runtime
const gamesFilePath = path.join(__dirname, "../data/games.json");

// function to read the JSON file
const readGamesJSON = async () => {
    const data = await fs.readFile(gamesFilePath, "utf-8");
    return JSON.parse(data);
};

// function to write data to the JSON file
const updateGamesJSON = async (newGamesData) => {
    await fs.writeFile(
        gamesFilePath,
        JSON.stringify(newGamesData, null, 2),
        "utf-8"
    );
};

// all games
router.get("/", async (req, res) => {
    try {
        const games = await readGamesJSON();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: "Error fetching games" }); // internal server error
    }
});

// get game from id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params; // get id from URL

        const games = await readGamesJSON();
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
