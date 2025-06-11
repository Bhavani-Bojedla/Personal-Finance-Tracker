import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // if you have custom styles

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    if (!Email || !Password) {
      alert("Please enter both Email and password.");
      return;
    }

    const loginData = { Email, Password };
    const url = "https://personal-finance-tracker-backend-hazel.vercel.app/users/checkuser";

    axios
      .post(url, loginData)
      .then((res) => {
        if (res.status === 200) {
          alert("Login successful!");
          // Store flag or token
          localStorage.setItem("userId", res.data.others._id);
          localStorage.setItem("isAuthenticated", "true");
          // You can store token also if returned: localStorage.setItem("token", res.data.token);
          navigate("/home");
        } else {
          Promise.reject();
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert(err.response.data.message);
        } else {
          alert("Invalid credentials or server error.");
          console.error(err);
        }
      });
  };

  return (
    <div className="body-bg">
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h1 style={{ color: "#4e0064" }}>Login</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              required
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p style={{ color: "black" }}>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
