import React, { useState } from "react";
import "../Signup/Signup";
import axios from "axios";
import { FaRegUser, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  const [Name, setName] = useState("");
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password,setPassword]=useState("");
  function handler(event){
    if (!Name || !Username || !Email || !Password) {
      alert("Please fill in all details");
      event.preventDefault();
      return;
    }  
    
    let inputObj={Name,Username,Email,Password};
    console.log(inputObj);
    let url="http://localhost:4000/users/createuser";
    axios.post(url,inputObj).then((res)=>{
      if(res.status===200){
        alert("user created");
        window.location.href = "/";
      }
      else{
        Promise.reject();
      }
    }).catch((e)=>{
      console.log(e)
    });
    event.preventDefault();
  }
  return (
    <div className="body-bg">
    <div className="wrapper"> 
      <form action="">
        <h1 style={{ color: "#4e0064" }}>Sign Up</h1>
        <div className="input-box">
          <input type="text" placeholder="Name" required value={Name} onChange={(e)=>setName(e.target.value)} />
          <FaRegUser className="icon" />
        </div>
        <div className="input-box">
          <input type="text" placeholder="Username" required value={Username} onChange={(e)=>setUsername(e.target.value)} />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="email" placeholder="Email" required value={Email} onChange={(e)=>setEmail(e.target.value)} />
          <FaEnvelope className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required value={Password} onChange={(e)=>setPassword(e.target.value)} />
          <FaLock className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Re-enter Password" required />
          <FaLock className="icon" />
        </div>
       
        <button type="submit" onClick={handler}>Sign Up</button>
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
