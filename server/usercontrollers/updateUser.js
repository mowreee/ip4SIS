const fs = require("fs");
const updateUser = (req, res) => {
    const data = JSON.parse(fs.readFileSync("./db/Users.json", "utf-8"));
    const UserId = req.params.UserId;
    const User = req.body;

    let index = data.findIndex((user) => user.UserId === UserId);

    if (index !== -1) {
        data[index] = { ...data[index], ...User };
        fs.writeFileSync("./db/Users.json", JSON.stringify(data, null, 2));
    }

    res.status(200).json({
        message: "User Updated",
        User: data[index],
    });
};

module.exports = updateUser;
