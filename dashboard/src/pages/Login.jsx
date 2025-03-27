import { useEffect, useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Login() {
  const [LoginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    navigate("/Dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>

        <div className="input-group">
          <input
            id="username"
            type="text"
            value={LoginData.username}
            onChange={(e) =>
              setLoginData({ ...LoginData, username: e.target.value })
            }
            placeholder="Username"
            className="input-field"
          />
        </div>

        <div className="input-group">
          <div className="password-container">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={LoginData.password}
              onChange={(e) =>
                setLoginData({ ...LoginData, password: e.target.value })
              }
              placeholder="Password"
              className="input-field"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </div>
        </div>

        <div className="button-group">
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
