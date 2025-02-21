const fs = require("fs");
const usersFilePath = "./data/users.json";

// creating users.json file with an empty array if file doesnt exist
if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, "[]", "utf8");
}
