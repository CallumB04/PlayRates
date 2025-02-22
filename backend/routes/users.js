const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

// using file path and fs.readFile for data retrieval, instead of require(), as users.json will change during runtime
const usersFilePath = path.join(__dirname, "../data/users.json");

// all users
router.get("/", async (req, res) => {
    try {
        const usersData = await fs.readFile(usersFilePath, "utf8");
        const users = JSON.parse(usersData);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" }); // internal server error
    }
});

// create new user (form validation is done in the frontend)
router.post("/new", async (req, res) => {
    try {
        const newUserAccount = req.body;
        const usersData = await fs.readFile(usersFilePath, "utf8");
        const users = JSON.parse(usersData);

        // ensure user only adds once
        if (!users.some((user) => user.email === newUserAccount.email)) {
            users.push(newUserAccount); // append new user to array
        }
        await fs.writeFile(
            usersFilePath,
            JSON.stringify(users, null, 2),
            "utf8"
        );

        res.status(201).json({ message: "User successfully created" });
    } catch (error) {
        res.status(500).json({ message: "Error creating new user" }); // internal server error
    }
});

// get user from id, email or username
router.get("/:type/:value", async (req, res) => {
    try {
        const { type, value } = req.params; // get type (id, email, username) and value from URL

        // if type is invalid, send error code
        if (!["id", "email", "username"].includes(type)) {
            return res.status(400).json({ message: "Invalid search type" });
        }

        const usersData = await fs.readFile(usersFilePath, "utf8");
        const users = JSON.parse(usersData);
        const user = users.find((user) => String(user[type]) === value);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500); // internal server error
    }
});

module.exports = router;
