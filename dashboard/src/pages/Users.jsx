import { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import Sidebar from "./Sidebar";
import "../styles/AddStudent.css";

// Table components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Icons
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import EditNoteIcon from '@mui/icons-material/EditNote';

function Users() {
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [data, setData] = useState({
    UserId: "",
    Firstname: "",
    Lastname: "",
    Middlename: "",
    Username: "",
    Password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    await axios
      .get("http://localhost:1337/api/getUsers")
      .then((res) => {
        setUser(res.data.users);
        console.table(res.data.users);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const deleteUser = async (UserId) => {
    if (confirm("Are you sure you want to delete this User?")) {
      await axios
        .delete(`http://localhost:1337/api/deleteUser/${UserId}`)
        .then((res) => {
          console.log(res);
          fetchUsers();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios
      .post("http://localhost:1337/api/addUser", data)
      .then((res) => {
        alert(res.data.message);
        setOpen(false);
        fetchUsers();
        setData({
          UserId: "",
          Firstname: "",
          Lastname: "",
          Middlename: "",
          Username: "",
          Password: "",
        });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const handleEditClick = (user) => {
    setData(user);

    setEditOpen(true);
  };

  const handleEditSubmit = async () => {
    await axios
      .patch(`http://localhost:1337/api/updateUser/${data.UserId}`, data)
      .then((res) => {
        alert(res.data.message);
        setEditOpen(false);
        fetchUsers();
        console.table(res.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="modal-box">
          <h2 className="modal-header">Add User</h2>
          {["UserId", "Firstname", "Lastname", "Middlename", "Username"].map(
            (field) => (
              <TextField
                key={field}
                className="text-field"
                label={field}
                name={field}
                value={data[field]}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            )
          )}
          <Button
            variant="contained"
            className="submit-button"
            onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>

      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <Box className="modal-box">
          <h2 className="modal-header">Edit User</h2>
          {["Firstname", "Lastname", "Middlename", "Username"].map((field) => (
            <TextField
              key={field}
              className="text-field"
              label={field}
              name={field}
              value={data[field]}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          ))}
          <Button
            variant="contained"
            className="submit-button"
            onClick={handleEditSubmit}>
            Update
          </Button>
        </Box>
      </Modal>

      <div className="addStudentDashboard">
        <h1 style={{ textAlign: "center" }}>User Management</h1>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add New User
          </Button>
        </div>



        <TableContainer className="table-container" component={Paper}>
          <Table
            sx={{ minWidth: 1000 }}
            size="small"
            aria-label="a dense table">
            <TableHead className="table-head">
              <TableRow>
                <TableCell className="table-cell">User Id</TableCell>
                <TableCell className="table-cell" align="right">
                  First Name
                </TableCell>
                <TableCell className="table-cell" align="right">
                  Middle Name
                </TableCell>
                <TableCell className="table-cell" align="right">
                  Last Name
                </TableCell>
                <TableCell className="table-cell" align="right">
                  Username
                </TableCell>

                <TableCell className="table-cell" align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.map((user) => (
                <TableRow className="table-row" key={user.UserId}>
                  <TableCell className="table-cell" component="th" scope="row">
                    {user.UserId}
                  </TableCell>
                  <TableCell className="table-cell" align="right">
                    {user.Firstname}
                  </TableCell>
                  <TableCell className="table-cell" align="right">
                    {user.Middlename}
                  </TableCell>
                  <TableCell className="table-cell" align="right">
                    {user.Lastname}
                  </TableCell>
                  <TableCell className="table-cell" align="right">
                    {user.Username}
                  </TableCell>

                  <TableCell className="table-cell" align="right">
                    <PersonRemoveIcon
                      className="icon"
                      onClick={() => deleteUser(user.UserId)}
                      style={{
                        marginRight: "10px",
                      }}
                    />
                    <EditNoteIcon
                      className="icon"
                      onClick={() => handleEditClick(user)}
                    />
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
