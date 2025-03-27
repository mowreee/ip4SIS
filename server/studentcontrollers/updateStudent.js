const fs = require("fs");
const updateStudent = (req, res) => {
    const data = JSON.parse(fs.readFileSync("./db/Student.json", "utf-8"));
    const Student = req.body;
    const { idNumber } = req.params;
    const index = data.findIndex(
        (Student) => Student.idNumber.toString() === idNumber.toString()
    );

    data[index] = Student;

    fs.writeFileSync("./db/Student.json", JSON.stringify(data, null, 2));

    res.status(200).json({
        message: "Student updated successfully",
        Student,
    });
};
module.exports = updateStudent;
