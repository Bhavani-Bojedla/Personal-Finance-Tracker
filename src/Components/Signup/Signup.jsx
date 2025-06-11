import React, { useState } from "react";
import axios from "axios";
import { FaRegUser, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  const [Name, setName] = useState("");
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [RePassword, setRePassword] = useState("");

  const handler = async (event) => {
    event.preventDefault();

    if (!Name || !Username || !Email || !Password || !RePassword) {
      alert("Please fill in all details");
      return;
    }

    if (Password !== RePassword) {
      alert("Passwords do not match");
      return;
    }

    const inputObj = { Name, Username, Email, Password };

    try {
      const url = "https://personal-finance-tracker-backend-hazel.vercel.app/users/createuser";
      const res = await axios.post(url, inputObj);
      if (res.status === 200) {
        alert("User created successfully");
        window.location.href = "/";
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        alert(e.response.data.message);
      } else {
        console.error(e);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="body-bg">
      <div className="wrapper">
        <form onSubmit={handler}>
          <h1 style={{ color: "#4e0064" }}>Sign Up</h1>

          <div className="input-box">
            <input type="text" placeholder="Name" required value={Name} onChange={(e) => setName(e.target.value)} />
            <FaRegUser className="icon" />
          </div>

          <div className="input-box">
            <input type="text" placeholder="Username" required value={Username} onChange={(e) => setUsername(e.target.value)} />
            <FaUser className="icon" />
          </div>

          <div className="input-box">
            <input type="email" placeholder="Email" required value={Email} onChange={(e) => setEmail(e.target.value)} />
            <FaEnvelope className="icon" />
          </div>

          <div className="input-box">
            <input type="password" placeholder="Password" required value={Password} onChange={(e) => setPassword(e.target.value)} />
            <FaLock className="icon" />
          </div>

          <div className="input-box">
            <input type="password" placeholder="Re-enter Password" required value={RePassword} onChange={(e) => setRePassword(e.target.value)} />
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
