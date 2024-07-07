import React from "react";
import "../Login/Login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="body-bg">
    <div className="wrapper">
      <form action="">
        <h1 style={{ color: "#4e0064;" }}>Login</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <FaLock className="icon" />
        </div>
        <div className="remember-forget">
          <label>
            <input type="checkbox" />
            <span style={{ color: "black" }}>Remember me</span>
          </label>
          <a href="#" style={{ color: "black" }}>
            Forgot password?
          </a>
        </div>
        <Link to='/home'>
        <button type="submit">Login</button></Link>
        <div className="register-link">
          <p style={{ color: "black" }}>
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;