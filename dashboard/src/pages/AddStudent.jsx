import { useState, useEffect } from "react";
import { TextField, Button, Modal, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import EditNoteIcon from '@mui/icons-material/EditNote';
import axios from "axios";
import Sidebar from "./Sidebar";
import "../styles/AddStudent.css";

function AddStudent() {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [data, setData] = useState({ idNumber: "", Firstname: "", Lastname: "", Middlename: "", course: "", year: "" });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:1337/api/getStudents");
      setStudents(res.data.students);
    } catch (error) {
      console.error("Error fetching students:", error.response?.data?.message || error.message);
    }
  };

  const deleteStudent = async (idNumber) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`http://localhost:1337/api/deleteStudents/${idNumber}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error.response?.data?.message || error.message);
    }
  };

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:1337/api/addStudents", data);
      alert("New Student Added");
      setOpen(false);
      fetchStudents();
      setData({ idNumber: "", Firstname: "", Lastname: "", Middlename: "", course: "", year: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Student Already Exists");
      console.error(error);
    }
  };

  const handleEditClick = (student) => {
    setData(student);
    setEditOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.patch(`http://localhost:1337/api/updateStudent/${data.idNumber}`, data);
      alert("Student Updated");
      setEditOpen(false);
      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      {/* Add Student Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="modal-box">
          <h2 className="modal-header">Add Student</h2>
          {["idNumber", "Firstname", "Lastname", "Middlename", "course", "year"].map((field) => (
            <TextField key={field} className="text-field" label={field} name={field} value={data[field]} onChange={handleChange} fullWidth margin="normal" />
          ))}
          <Box className="button-group">
            <Button variant="contained" className="submit-button" onClick={handleSubmit}>Submit</Button>
            <Button variant="outlined" className="cancel-button" onClick={() => setOpen(false)}>Cancel</Button>
          </Box>
        </Box>
      </Modal>

      {/* Edit Student Modal */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <Box className="modal-box">
          <h2 className="modal-header">Edit Student</h2>
          {["Firstname", "Lastname", "Middlename", "course", "year"].map((field) => (
            <TextField key={field} className="text-field" label={field} name={field} value={data[field]} onChange={handleChange} fullWidth margin="normal" />
          ))}
          <Box className="button-group">
            <Button variant="contained" className="submit-button" onClick={handleEditSubmit}>Update</Button>
            <Button variant="outlined" className="cancel-button" onClick={() => setEditOpen(false)}>Cancel</Button>
          </Box>
        </Box>
      </Modal>

      {/* Student Table */}
      <div className="addStudentDashboard">
        <div className="header-container">
          <h1>Student Management</h1>
          <Button variant="contained" className="add-student-button" onClick={() => setOpen(true)}>
            Add Student
          </Button>
        </div>

        <TableContainer className="table-container" component={Paper}>
          <Table sx={{ minWidth: 1000 }} size="small">
            <TableHead className="table-head">
              <TableRow>
                {["ID Number", "First Name", "Middle Name", "Last Name", "Course", "Year", "Actions"].map((header) => (
                  <TableCell key={header} className="table-cell" align="right">{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow className="table-row" key={student.idNumber}>
                  {["idNumber", "Firstname", "Middlename", "Lastname", "course", "year"].map((field) => (
                    <TableCell key={field} className="table-cell" align="right">{student[field]}</TableCell>
                  ))}
                  <TableCell className="table-cell" align="right">
                    <PersonRemoveIcon className="icon" onClick={() => deleteStudent(student.idNumber)} style={{ marginRight: "10px" }} />
                    <EditNoteIcon className="icon" onClick={() => handleEditClick(student)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Sidebar />
    </>
  );
}

export default AddStudent;
