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

// all users
router.get("/", async (req, res) => {
    try {
        const users = await readUsersJSON();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" }); // internal server error
    }
});

// create new user (form validation is done in the frontend)
router.post("/new", async (req, res) => {
    try {
        const newUserAccount = req.body;
        const users = await readUsersJSON();

        // ensure user only adds once
        if (!users.some((user) => user.email === newUserAccount.email)) {
            users.push(newUserAccount); // append new user to array
        }
        await updateUsersJSON(users);

        res.status(201).json({ message: "User successfully created" });
    } catch (error) {
        res.status(500).json({ message: "Error creating new user" }); // internal server error
    }
});

// update user information
router.patch("/update/:id", async (req, res) => {
    try {
        const newData = req.body; // new user to be updated into user
        const { id } = req.params;
        const users = await readUsersJSON();

        // check if user exists
        if (!users.some((user) => user.id === Number(id))) {
            return res.status(404).json({ message: "User not found" });
        }

        // update user with new info
        await updateUsersJSON(
            users.map((user) =>
                user.id === Number(id) ? { ...user, ...newData } : user
            )
        );

        res.status(200).json({ message: "User successfully updated" });
    } catch (error) {
        res.status(500).json({ message: "Error updating user" }); // internal server error
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

        const users = await readUsersJSON();
        const user = users.find(
            (user) => String(user[type]).toLowerCase() === value.toLowerCase()
        );

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
