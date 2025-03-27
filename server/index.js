require("express-async-errors");
require("dotenv").config();

const express = require("express");
const errorHandler = require("./handlers/errorHandler");
const cors = require("cors");

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

const port = 1337;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
