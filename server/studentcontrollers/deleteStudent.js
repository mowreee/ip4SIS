const fs = require("fs");
const deleteStudent = (req, res) => {
    const data = JSON.parse(fs.readFileSync("./db/Student.json", "utf-8"));
    const { idNumber } = req.params;
    const index = data.findIndex(
        (student) => student.idNumber.toString() === idNumber.toString()
    );

    data.splice(index, 1);

    fs.writeFileSync("./db/Student.json", JSON.stringify(data, null, 2));

    res.status(200).json({
        message: "Student deleted successfully",
        students: data,
    });
};
module.exports = deleteStudent;
