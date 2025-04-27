const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

// using file path and fs.readFile for data retrieval, instead of require(), as .json files will change during runtime
const reviewsFilePath = path.join(__dirname, "../data/reviews.json");
const usersFilePath = path.join(__dirname, "../data/users.json");

// function to read reviews JSON file
const readUsersJSON = async () => {
    const data = await fs.readFile(usersFilePath, "utf-8");
    return JSON.parse(data);
};

// function to read users JSON file
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
router.get("/:userID", async (req, res) => {
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

module.exports = router;
