const usersJsonSetup = require("./utils/createJson"); // creating any json files if they dont exist
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json()); // middleware which allows for json parsing

app.get("/", (req, res) => {
    res.send("This is working");
});

const usersRouter = require("./routes/users");
app.use("/users", usersRouter); // all routes within users.js start with /users
const gamesRouter = require("./routes/games");
app.use("/games", gamesRouter); // all routes within games.js start with /games
const friendsRouter = require("./routes/friends");
app.use("/friends", friendsRouter); // all routes within friends.js start with /friends
const gameLogsRouter = require("./routes/gamelogs");
app.use("/gamelogs", gameLogsRouter); // all routes within gamelogs.js start with /gamelogs

app.listen(3000); // localhost:3000
