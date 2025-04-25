import HomeIcon from "@mui/icons-material/Home";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddTaskIcon from '@mui/icons-material/AddTask';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import "../styles/Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  const links = [
    { to: "/", label: "HOME", icon: <HomeIcon /> },
    { to: "/AddStudent", label: "ADD STUDENT", icon: <PersonAddAlt1Icon /> },
    { to: "/TaskTracker", label: "TASK TRACKER", icon: <AddTaskIcon /> },
    { to: "/Users", label: "USER MANAGEMENT", icon: <GroupAddIcon /> },
    {to: "/ManageStudent", label: "MANAGE STUDENT", icon: <GroupAddIcon /> }
  ];

  return (
    <div className="side">
      {links.map((link, index) => (
        <Link to={link.to} key={index} className="link">
          <div className="sidebar-item">
            {link.icon}
            <span className="sidebar-label">{link.label}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
