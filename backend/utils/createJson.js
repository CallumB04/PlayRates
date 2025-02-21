const fs = require("fs");
const usersFilePath = "./data/users.json";
const gamesFilePath = "./data/games.json";

// creating users.json file with an empty array if file doesnt exist
if (!fs.existsSync(usersFilePath)) {
    fs.mkdirSync("data");
    fs.writeFileSync(usersFilePath, "[]", "utf8");
    fs.writeFileSync(gamesFilePath, "[]", "utf8");
}
