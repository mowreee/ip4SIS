const fs = require("fs");
const getStudents = (req, res) => {
    const data = JSON.parse(fs.readFileSync("./db/Student.json", "utf-8"));
    res.status(200).json({
        message: "Students Data",
        students: data,
    });
};
module.exports = getStudents;
