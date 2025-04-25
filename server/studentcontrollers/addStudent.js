const Student = require("../models/student.model");

module.exports = async (req, res) => {
  try {
    const { idNumber, firstName, lastName, middleName, course, year } = req.body;

    const exists = await Student.findOne({ idNumber });
    if (exists) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const newStudent = new Student({
      idNumber,
      firstName,
      lastName,
      middleName,
      course,
      year,
    });

    await newStudent.save();
    res.status(201).json({ message: "Student added successfully" });
  } catch (err) {
    console.error("AddStudent Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
