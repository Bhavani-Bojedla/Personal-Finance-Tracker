import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/home" className="nav-left" style={{ display: "flex", alignItems: "center",textDecoration:'none' }}>
        <div className="nav-logo"></div>
        <i style={{color:'white',width:'15rem',paddingLeft:'1rem',textDecoration:'none',fontSize:'20px'}}>Personal-Finance-Tracker</i>
      </Link>

      <div className="nav-right">
        <Link to="/home" className="nav-text">
          <i className="bx bx-home nav-icon"></i>Home
        </Link>
        <Link to="/history" className="nav-text">
          <i className="bx bx-history nav-icon"></i>History
        </Link>
        <Link to="/profile" className="nav-text">
          <i className="bx bx-user-circle nav-icon"></i>Profile
        </Link>
        <div onClick={handleLogout} className="nav-text logout-button">
          <i className="bx bx-log-out nav-icon"></i>Logout
        </div>
      </div>
    </div>
  );
}
