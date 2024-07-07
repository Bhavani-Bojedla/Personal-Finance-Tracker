import React from "react";
import "../Signup/Signup";
import { FaRegUser, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="body-bg">
    <div className="wrapper">
      <form action="">
        <h1 style={{ color: "#4e0064;" }}>Sign Up</h1>
        <div className="input-box">
          <input type="text" placeholder="Name" required />
          <FaRegUser className="icon" />
        </div>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="email" placeholder="Email" required />
          <FaEnvelope className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <FaLock className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Re-enter Password" required />
          <FaLock className="icon" />
        </div>
        <button type="submit">Sign Up</button>
        <div className="register-link">
          <p style={{ color: "black" }}>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Signup;