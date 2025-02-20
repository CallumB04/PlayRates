const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("This is working");
});

const usersRouter = require("./routes/users");
app.use("/users", usersRouter); // all routes within users.js start with /users
const gamesRouter = require("./routes/games");
app.use("/games", gamesRouter); // all routes within games.js start with /games

app.listen(3000); // localhost:3000
