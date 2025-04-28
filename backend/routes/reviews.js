const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

// using file path and fs.readFile for data retrieval, instead of require(), as .json files will change during runtime
const reviewsFilePath = path.join(__dirname, "../data/reviews.json");
const usersFilePath = path.join(__dirname, "../data/users.json");
const gamesFilePath = path.join(__dirname, "../data/games.json");
const gameLogsFilePath = path.join(__dirname, "../data/gamelogs.json");

// function to read reviews JSON file
const readUsersJSON = async () => {
    const data = await fs.readFile(usersFilePath, "utf-8");
    return JSON.parse(data);
};

// function to read games JSON file
const readGamesJSON = async () => {
    const data = await fs.readFile(gamesFilePath, "utf-8");
    return JSON.parse(data);
};

// function to read gamelogs JSON file
const readGameLogsJSON = async () => {
    const data = await fs.readFile(gameLogsFilePath, "utf-8");
    return JSON.parse(data);
};

// function to read reviews JSON file
const readReviewsJSON = async () => {
    const data = await fs.readFile(reviewsFilePath, "utf-8");
    return JSON.parse(data);
};
// function to write data to the JSON file
const updateReviewsJSON = async (newReviewsData) => {
    await fs.writeFile(
        reviewsFilePath,
        JSON.stringify(newReviewsData, null, 2),
        "utf-8"
    );
};

// all reviews
router.get("/", async (req, res) => {
    try {
        const reviews = await readReviewsJSON();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews" }); // internal server error
    }
});

// reviews of a given user
router.get("/user/:userID", async (req, res) => {
    try {
        const userID = req.params.userID;
        const users = await readUsersJSON();
        const reviews = await readReviewsJSON();

        // get user info from api request
        const userExists = users.some((user) => user.id === Number(userID));

        // ensuring user exists in database
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(reviews[userID] || []); // return user reviews, or empty array if none found
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews" }); // internal server error
    }
});

// reviews of a given game
router.get("/game/:gameID", async (req, res) => {
    try {
        const gameID = req.params.gameID;
        const games = await readGamesJSON();
        const users = await readUsersJSON();
        const reviews = await readReviewsJSON();
        const gamelogs = await readGameLogsJSON();

        // get game info from api request
        const gameExists = games.some((game) => game.id === Number(gameID));

        // ensuring game exists in database
        if (!gameExists) {
            return res.status(404).json({ message: "Game not found" });
        }

        // mapping reviews from given game into new array
        const reviewsFromGame = Object.entries(reviews).flatMap(
            ([userID, reviewsData]) =>
                reviewsData
                    .filter((review) => review.gameID === Number(gameID))
                    .map((review) => {
                        const reviewer = users.find(
                            (user) => user.id === Number(userID)
                        );
                        const gameLog = gamelogs[userID]?.find(
                            (gamelog) => gamelog.id === review.gameID
                        );
                        return {
                            ...review,
                            reviewerName: reviewer.username,
                            reviewerProfilePicture: reviewer.picture,
                            reviewerGameLogRating: gameLog?.rating,
                            reviewerGameLogPlatform: gameLog?.platform,
                        };
                    })
        );

        res.status(200).json(reviewsFromGame || []); // return game reviews, or empty array if none found
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews" }); // internal server error
    }
});

module.exports = router;
