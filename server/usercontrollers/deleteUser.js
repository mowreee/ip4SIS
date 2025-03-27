const fs = require("fs");
const deleteUser = (req, res) => {
    let { UserId } = req.params;
    let User = JSON.parse(fs.readFileSync("./db/Users.json", "utf-8"));

    User = User.filter((User) => User.UserId !== UserId);

    fs.writeFileSync("./db/Users.json", JSON.stringify(User, null, 2));
    res.status(200).json({
        message: "User Deleted",
        User,
    });
};
module.exports = deleteUser;
