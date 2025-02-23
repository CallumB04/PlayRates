const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

// using file path and fs.readFile for data retrieval, instead of require(), as json files will change during runtime
const friendsFilePath = path.join(__dirname, "../data/friends.json");
const usersFilePath = path.join(__dirname, "../data/users.json");

// function to read the friends JSON file
const readFriendsJSON = async () => {
    const data = await fs.readFile(friendsFilePath, "utf-8");
    return JSON.parse(data);
};

// function to write data to the friends JSON file
const updateFriendsJSON = async (newFriendsData) => {
    await fs.writeFile(
        friendsFilePath,
        JSON.stringify(newFriendsData, null, 2),
        "utf-8"
    );
};

// function to read the users JSON file
const readUsersJSON = async () => {
    const data = await fs.readFile(usersFilePath, "utf-8");
    return JSON.parse(data);
};

// all friends of all users
router.get("/", async (req, res) => {
    try {
        const friends = await readFriendsJSON();
        res.status(200).json(friends);
    } catch (error) {
        res.status(500).json({ message: "Error fetching friends" }); // internal server error
    }
});

// send friend request
router.patch("/add/:id", async (req, res) => {
    try {
        const friends = await readFriendsJSON();
        const users = await readUsersJSON();
        const toUserID = Number(req.params.id);
        const fromUserID = req.body.id;

        // creating new friends array in file if either user doesnt exist yet
        if (!friends.hasOwnProperty(toUserID)) {
            friends[toUserID] = [];
        }
        if (!friends.hasOwnProperty(fromUserID)) {
            friends[fromUserID] = [];
        }

        // checking users both exist in users database
        const fromUserExists = users.find((user) => user.id === fromUserID); // user sending request, passed through request body
        const toUserExists = users.find((user) => user.id === toUserID); // user receiving request, passed through URL

        if (!fromUserExists || !toUserExists) {
            return res.status(404).json({ message: "User not found" });
        }

        // adding new friend request to both users in friends json
        friends[fromUserID].push({
            id: toUserID,
            status: "request-sent",
        });
        friends[toUserID].push({
            id: fromUserID,
            status: "request-received",
        });

        // update local JSON file
        await updateFriendsJSON(friends);

        res.status(204).json({ message: "Friend request sent" });
    } catch {
        res.status(500).json({ message: "Error sending friend request" });
    }
});

// accept friend request
router.patch("/accept/:id", async (req, res) => {
    try {
        const users = await readUsersJSON();
        const friends = await readFriendsJSON();
        const sendingUserID = Number(req.params.id);
        const acceptingUserID = req.body.id;

        // get user info from api request
        const acceptingUserExists = users.find(
            (user) => user.id === sendingUserID
        ); // user accepting request, passed through request body
        const sendingUserExists = users.find(
            (user) => user.id === acceptingUserID
        ); // user that sent request, passed through URL

        // ensuring both users exist in database
        if (!acceptingUserExists || !sendingUserExists) {
            return res.status(404).json({ message: "User not found" });
        }

        // update new friend statuses to user friend arrays
        friends[acceptingUserID] = friends[acceptingUserID].map((friend) =>
            friend.id === sendingUserID
                ? { ...friend, status: "friend" }
                : friend
        );
        friends[sendingUserID] = friends[sendingUserID].map((friend) =>
            friend.id === acceptingUserID
                ? { ...friend, status: "friend" }
                : friend
        );

        // update local JSON file
        await updateFriendsJSON(friends);

        res.status(204).json({ message: "Friend request accepted" });
    } catch {
        res.status(500).json({ message: "Error accepting friend request" });
    }
});

// decline friend request
router.patch("/decline/:id", async (req, res) => {
    try {
        const users = await readUsersJSON();
        const friends = await readFriendsJSON();
        const sendingUserID = Number(req.params.id);
        const decliningUserID = req.body.id;

        // get user info from api request
        const decliningUserExists = users.find(
            (user) => user.id === sendingUserID
        ); // user declining request, passed through request body
        const sendingUserExists = users.find(
            (user) => user.id === decliningUserID
        ); // user that sent request, passed through URL

        // ensuring both users exist in database
        if (!decliningUserExists || !sendingUserExists) {
            return res.status(404).json({ message: "User not found" });
        }

        // remove users from eachothers friend arrays
        friends[decliningUserID] = friends[decliningUserID].filter(
            (friend) => friend.id !== sendingUserID
        );
        friends[sendingUserID] = friends[sendingUserID].filter(
            (friend) => friend.id !== decliningUserID
        );

        // update local JSON file
        await updateFriendsJSON(friends);

        res.status(204).json({ message: "Friend request declined" });
    } catch {
        res.status(500).json({ message: "Error declining friend request" });
    }
});

// cancel friend request
router.patch("/cancel/:id", async (req, res) => {
    try {
        const users = await readUsersJSON();
        const friends = await readFriendsJSON();
        const receivingUserID = Number(req.params.id);
        const cancellingUserID = req.body.id;

        // get user info from api request
        const cancellingUserExists = users.find(
            (user) => user.id === receivingUserID
        ); // user cancelling request, passed through request body
        const receivingUserExists = users.find(
            (user) => user.id === cancellingUserID
        ); // user that received request, passed through URL

        // ensuring both users exist in database
        if (!cancellingUserExists || !receivingUserExists) {
            return res.status(404).json({ message: "User not found" });
        }

        // remove users from eachothers friend arrays
        friends[cancellingUserID] = friends[cancellingUserID].filter(
            (friend) => friend.id !== receivingUserID
        );
        friends[receivingUserID] = friends[receivingUserID].filter(
            (friend) => friend.id !== cancellingUserID
        );

        // update local JSON file
        await updateFriendsJSON(friends);

        res.status(204).json({ message: "Friend request cancelled" });
    } catch {
        res.status(500).json({ message: "Error cancelling friend request" });
    }
});

// get user's friends from id
router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const users = await readUsersJSON();
        const friends = await readFriendsJSON();

        // check user exists in database
        const userExists = users.find((user) => user.id === id);

        if (!userExists) {
            res.status(404).json({ message: "User not found" });
        }

        // send friends array or empty array if user has no friends
        res.status(200).json(friends[id] || []);
    } catch (error) {
        res.status(500); // internal server error
    }
});

module.exports = router;
