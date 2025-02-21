const fs = require("fs");
const usersFilePath = "./data/users.json";
const gamesFilePath = "./data/games.json";

// create data folder if doesnt exist
if (!fs.existsSync("data")) {
    fs.mkdirSync("data");
}

// create users.json with empty array if file doesnt exist
if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, "[]", "utf8");
}

// create games.json with empty array if file doesnt exist
if (!fs.existsSync(gamesFilePath)) {
    fs.writeFileSync(gamesFilePath, "[]", "utf8");
}
