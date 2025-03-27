const fs = require("fs");
const getUsers = (req, res) => {
    const data = JSON.parse(fs.readFileSync("./db/Users.json", "utf-8"));

    res.status(200).json({
        message: "Users Data",
        users: data,
    });
};

module.exports = getUsers;
