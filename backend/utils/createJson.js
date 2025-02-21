const fs = require("fs");
const usersFilePath = "./data/users.json";
const gamesFilePath = "./data/games.json";

// creating json files with empty arrays if files dont exist
if (!fs.existsSync(usersFilePath)) {
    fs.mkdirSync("data"); // create data folder
    fs.writeFileSync(usersFilePath, "[]", "utf8");
    fs.writeFileSync(gamesFilePath, "[]", "utf8");
}
