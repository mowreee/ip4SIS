const fs = require("fs");
const addUser = (req, res) => {
    const data = JSON.parse(fs.readFileSync("./db/Users.json", "utf-8"));
    const User = req.body;
    const UserId = data.map((user) => user.UserId);
    const UserIndex = UserId.indexOf(User.UserId);

    if (UserIndex > -1) throw "User Already Exists";

    data.push(User);

    fs.writeFileSync("./db/Users.json", JSON.stringify(data, null, 2));

    res.status(200).json({
        message: "New User Added",
        User,
    });
};

module.exports = addUser;
