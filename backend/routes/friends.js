const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

// using file path and fs.readFile for data retrieval, instead of require(), as users.json will change during runtime
const usersFilePath = path.join(__dirname, "../data/users.json");

// function to read the JSON file
const readUsersJSON = async () => {
    const data = await fs.readFile(usersFilePath, "utf-8");
    return JSON.parse(data);
};

// function to write data to the JSON file
const updateUsersJSON = async (newUserData) => {
    await fs.writeFile(
        usersFilePath,
        JSON.stringify(newUserData, null, 2),
        "utf-8"
    );
};

router.patch("/add/:id", async (req, res) => {
    try {
        const users = await readUsersJSON();
        const toUserID = Number(req.params.id);

        // get user info from api request
        const fromUserIndex = users.findIndex(
            (user) => user.id === req.body.id
        ); // user sending request, passed through request body
        const toUserIndex = users.findIndex((user) => user.id === toUserID); // user receiving request, passed through URL

        // ensuring both users exist in database
        if (fromUserIndex === -1 || toUserIndex === -1) {
            return res.status(404).send("User not found");
        }

        // add new friend statuses to user friend arrays
        users[fromUserIndex]["friends"].push({
            id: toUserID,
            status: "request-sent",
        });
        users[toUserIndex]["friends"].push({
            id: req.body.id,
            status: "request-received",
        });

        // update local JSON file
        await updateUsersJSON(users);

        res.status(200).send("Friend request sent");
    } catch {
        res.status(404).send("User not found");
    }
});

router.patch("/accept/:id", async (req, res) => {
    try {
        const users = await readUsersJSON();
        const sendingUserID = Number(req.params.id);
        const acceptingUserID = req.body.id;

        // get user info from api request
        const acceptingUserIndex = users.findIndex(
            (user) => user.id === acceptingUserID
        ); // user accepting request, passed through request body
        const sendingUserIndex = users.findIndex(
            (user) => user.id === sendingUserID
        ); // user that sent request, passed through URL

        // ensuring both users exist in database
        if (acceptingUserIndex === -1 || sendingUserIndex === -1) {
            return res.status(404).send("User not found");
        }

        // update new friend statuses to user friend arrays
        users[acceptingUserIndex]["friends"] = users[acceptingUserIndex][
            "friends"
        ].map((friend) =>
            friend.id === sendingUserID
                ? { ...friend, status: "friend" }
                : friend
        );
        users[sendingUserIndex]["friends"] = users[sendingUserIndex][
            "friends"
        ].map((friend) =>
            friend.id === acceptingUserID
                ? { ...friend, status: "friend" }
                : friend
        );

        // update local JSON file
        await updateUsersJSON(users);

        res.status(200).send("Friend Request accepted");
    } catch {
        res.status(404).send("User not found");
    }
});

module.exports = router;
