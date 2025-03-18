const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

// using file path and fs.readFile for data retrieval, instead of require(), as gamelogs.json will change during runtime
const gameLogsFilePath = path.join(__dirname, "../data/gamelogs.json");

// function to read the JSON file
const readGameLogsJSON = async () => {
    const data = await fs.readFile(gameLogsFilePath, "utf-8");
    return JSON.parse(data);
};

// function to write data to the JSON file
const updateGameLogsJSON = async (newGameLogsData) => {
    await fs.writeFile(
        gameLogsFilePath,
        JSON.stringify(newGameLogsData, null, 2),
        "utf-8"
    );
};

// all game logs
router.get("/", async (req, res) => {
    try {
        const gameLogs = await readGameLogsJSON();
        res.status(200).json(gameLogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching game logs" }); // internal server error
    }
});

// game logs of a given user
router.get("/:userID", async (req, res) => {
    try {
        const userID = req.params.userID;
        const gameLogs = await readGameLogsJSON();
        res.status(200).json(gameLogs[userID]);
    } catch (error) {
        res.status(500).json({ message: "Error fetching game logs" }); // internal server error
    }
});

module.exports = router;
