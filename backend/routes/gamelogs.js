const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

// using file path and fs.readFile for data retrieval, instead of require(), as .json files will change during runtime
const gameLogsFilePath = path.join(__dirname, "../data/gamelogs.json");
const usersFilePath = path.join(__dirname, "../data/users.json");

// function to read game logs JSON file
const readUsersJSON = async () => {
    const data = await fs.readFile(usersFilePath, "utf-8");
    return JSON.parse(data);
};

// function to read users JSON file
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

        res.status(200).json(gameLogs[userID] || []); // return user game logs, or empty array if none found
    } catch (error) {
        res.status(500).json({ message: "Error fetching game logs" }); // internal server error
    }
});

// create new game log
router.post("/:userID/create", async (req, res) => {
    try {
        const userID = req.params.userID;
        const { logData } = req.body;
        const gameLogs = await readGameLogsJSON();
        const users = await readUsersJSON();

        // ensuring user exists
        if (!users.find((user) => user.id === Number(userID))) {
            return res.status(404).json({ message: "User not found" });
        }

        // creating user in database if first game log
        if (!gameLogs[userID]) {
            gameLogs[userID] = [];
        }

        // add game log data to the users array and update in database
        gameLogs[userID].push(logData);
        await updateGameLogsJSON(gameLogs);
        res.status(204).json({ message: "Game log successfully created" });
    } catch (error) {
        res.status(500).json({ message: "Error creating game log" }); // internal server error
    }
});

module.exports = router;
