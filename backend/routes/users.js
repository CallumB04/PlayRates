const users = require("../data/users.json");

const express = require("express");
const router = express.Router();

// all users
router.get("/", (req, res) => {
    res.json(users);
});

// get user from id, email or username
router.get("/:type/:value", (req, res) => {
    const { type, value } = req.params; // get type (id, email, username) and value from URL

    // if type is invalid, send error code
    if (!["id", "email", "username"].includes(type)) {
        return res.status(400).send("Invalid search type");
    }

    const user = users.find((user) => String(user[type]) === value);

    if (user) {
        res.json(user);
    } else {
        res.status(404).send("User not found");
    }
});

module.exports = router;
