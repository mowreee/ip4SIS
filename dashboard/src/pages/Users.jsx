import { useState, useEffect } from "react";
import { TextField, Button, Modal, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import EditNoteIcon from '@mui/icons-material/EditNote';
import axios from "axios";
import Sidebar from "./Sidebar";
import "../styles/AddStudent.css";

function Users() {
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [data, setData] = useState({ UserId: "", Firstname: "", Lastname: "", Middlename: "", Username: "", Password: "" });

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:1337/api/getUsers");
      setUser(res.data.users);
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteUser = async (UserId) => {
    if (confirm("Are you sure you want to delete this User?")) {
      try {
        await axios.delete(`http://localhost:1337/api/deleteUser/${UserId}`);
        fetchUsers();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:1337/api/addUser", data);
      alert("User added successfully");
      setOpen(false);
      fetchUsers();
      setData({ UserId: "", Firstname: "", Lastname: "", Middlename: "", Username: "", Password: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Error adding user");
    }
  };

  const handleEditClick = (user) => { setData(user); setEditOpen(true); };

  const handleEditSubmit = async () => {
    try {
      await axios.patch(`http://localhost:1337/api/updateUser/${data.UserId}`, data);
      alert("User updated successfully");
      setEditOpen(false);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="modal-box">
          <h2 className="modal-header">Add User</h2>
          {["UserId", "Firstname", "Lastname", "Middlename", "Username", "Password"].map((field) => (
            <TextField key={field} className="text-field" label={field} name={field} value={data[field]} onChange={handleChange} fullWidth margin="normal" />
          ))}
          <Button variant="contained" className="submit-button" onClick={handleSubmit}>Submit</Button>
          <Button variant="outlined" className="cancel-button" onClick={() => setOpen(false)}>Cancel</Button>
        </Box>
      </Modal>

      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <Box className="modal-box">
          <h2 className="modal-header">Edit User</h2>
          {["Firstname", "Lastname", "Middlename", "Username", "Password"].map((field) => (
            <TextField key={field} className="text-field" label={field} name={field} value={data[field]} onChange={handleChange} fullWidth margin="normal" />
          ))}
          <Button variant="contained" className="submit-button" onClick={handleEditSubmit}>Update</Button>
          <Button variant="outlined" className="cancel-button" onClick={() => setEditOpen(false)}>Cancel</Button>
        </Box>
      </Modal>

      <div className="addStudentDashboard">
        <h1 style={{ textAlign: "center" }}>User Management</h1>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Button variant="contained" onClick={() => setOpen(true)}>Add New User</Button>
        </div>

        <TableContainer className="table-container" component={Paper}>
          <Table sx={{ minWidth: 1000 }} size="small">
            <TableHead className="table-head">
              <TableRow>
                {["User ID", "First Name", "Middle Name", "Last Name", "Username","Password", "Actions"].map(header => (
                  <TableCell key={header} className="table-cell" align="right">{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {user.map((user) => (
                <TableRow className="table-row" key={user.UserId}>
                  {["UserId", "Firstname", "Middlename", "Lastname", "Username","Password"].map(field => (
                    <TableCell key={field} className="table-cell" align="right">{user[field]}</TableCell>
                  ))}
                  <TableCell className="table-cell" align="right">
                    <PersonRemoveIcon className="icon" onClick={() => deleteUser(user.UserId)} style={{ marginRight: "10px" }} />
                    <EditNoteIcon className="icon" onClick={() => handleEditClick(user)} />
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

export default Users;
