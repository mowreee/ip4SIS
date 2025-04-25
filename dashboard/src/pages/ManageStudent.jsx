import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Modal,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import EditNoteIcon from "@mui/icons-material/EditNote";
import axios from "axios";
import Sidebar from "./Sidebar";
import "../styles/AddStudent.css";

const initialForm = {
  idNumber: "",
  firstName: "",
  lastName: "",
  middleName: "",
  course: "",
  year: "",
};

function ManageStudent() {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:1337/api/getStudents");
      setStudents(res.data.students);
    } catch (err) {
      console.error("Fetch error:", err.response?.data?.message || err.message);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:1337/api/addStudents", form);
      alert("Student added");
      setOpen(false);
      fetchStudents();
      setForm(initialForm);
    } catch (err) {
      alert(err.response?.data?.message || "Student already exists");
    }
  };

  const handleEdit = async () => {
    try {
      await axios.patch(
        `http://localhost:1337/api/updateStudent/${form.idNumber}`,
        form
      );
      alert("Student updated");
      setEditOpen(false);
      fetchStudents();
    } catch (err) {
      console.error("Update error:", err.response?.data?.message || err.message);
    }
  };

  const handleDelete = async (idNumber) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(
        `http://localhost:1337/api/deleteStudents/${idNumber}`
      );
      fetchStudents();
    } catch (err) {
      console.error("Delete error:", err.response?.data?.message || err.message);
    }
  };

  const openEditModal = (student) => {
    setForm(student);
    setEditOpen(true);
  };

  const renderTextFields = (fields) =>
    fields.map((field) => (
      <TextField
        key={field}
        className="text-field"
        label={field}
        name={field}
        value={form[field] || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
    ));

  return (
    <>
      {/* Sidebar */}
      <Sidebar />

      {/* Add Student Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="modal-box">
          <h2 className="modal-header">Add Student</h2>
          {renderTextFields([
            "idNumber",
            "firstName",
            "lastName",
            "middleName",
            "course",
            "year",
          ])}
          <Box className="button-group">
            <Button variant="contained" className="submit-button" onClick={handleAdd}>
              Submit
            </Button>
            <Button variant="outlined" className="cancel-button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Edit Student Modal */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <Box className="modal-box">
          <h2 className="modal-header">Edit Student</h2>
          {renderTextFields(["firstName", "lastName", "middleName", "course", "year"])}
          <Box className="button-group">
            <Button variant="contained" className="submit-button" onClick={handleEdit}>
              Update
            </Button>
            <Button variant="outlined" className="cancel-button" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Main Content */}
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
                {["ID Number", "First Name", "Middle Name", "Last Name", "Course", "Year", "Actions"].map(
                  (header) => (
                    <TableCell key={header} className="table-cell" align="right">
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow className="table-row" key={student.idNumber}>
                  {["idNumber", "firstName", "middleName", "lastName", "course", "year"].map((field) => (
                    <TableCell key={field} className="table-cell" align="right">
                      {student[field]}
                    </TableCell>
                  ))}
                  <TableCell className="table-cell" align="right">
                    <PersonRemoveIcon
                      className="icon"
                      onClick={() => handleDelete(student.idNumber)}
                      style={{ marginRight: "10px", cursor: "pointer" }}
                    />
                    <EditNoteIcon
                      className="icon"
                      onClick={() => openEditModal(student)}
                      style={{ cursor: "pointer" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default ManageStudent;
