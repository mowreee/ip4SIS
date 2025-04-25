require("express-async-errors");
require("dotenv").config();

const express = require("express");
const errorHandler = require("./handlers/errorHandler");
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/SIS");

const app = express();

const getUsers = require("./usercontrollers/getUsers");
const addUser = require("./usercontrollers/addUsers");
const updateUser = require("./usercontrollers/updateUser");
const deleteUser = require("./usercontrollers/deleteUser");
const addStudent = require("./studentcontrollers/addStudent");
const getStudents = require("./studentcontrollers/getStudents");
const updateStudent = require("./studentcontrollers/updateStudent");
const deleteStudent = require("./studentcontrollers/deleteStudent");
app.use(cors());
app.use(express.json());

app.get("/api/getStudents", getStudents);

app.post("/api/addStudents", addStudent);

app.patch("/api/updateStudent/:idNumber", updateStudent);

app.delete("/api/deleteStudents/:idNumber", deleteStudent);

app.get("/api/getUsers", getUsers);

app.post("/api/addUser", addUser);

app.patch("/api/updateUser/:UserId", updateUser);

app.delete("/api/deleteUser/:UserId", deleteUser);

app.use(errorHandler);

app.post("/addstudentmongo", async (req, res) => {
    try{
        const { id, firstName, lastName, middleName, course, year } = req.body;

        const newStudent = new Student({
               
            id,
            firstName,
            lastName,
            middleName,
            course,
            year
        });
        
        await newStudent.save();
        return res.status(201).json({ message: "Student added successfully" });
    } catch (error) {
        console.error("Error adding student:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

const port = 1337;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});