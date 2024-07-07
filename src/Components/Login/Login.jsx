import React,{ useState } from "react";
import "../Login/Login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password,setPassword]=useState("");
  function handler(event) {
    if (!Email || !Password) {
      alert("Please fill in all details");
      event.preventDefault();
      return;
    }  
    
    let inputObj={Email,Password};
    console.log(inputObj);

    let url="http://localhost:4000/users/checkuser";
    axios.post(url,inputObj)
    .then((res)=>{ console.log(res)
      if(res.data==="success"){
        alert("correct");
        window.location.href = "/home";
        // navigate('/home')
      }
      else{
      
        Promise.reject();
        alert("wrong")
      }
    }).catch((e)=>{
      console.log(e)
    });
    event.preventDefault();
  }
  return (
    <div className="body-bg">
    <div className="wrapper">
      <form action="" onSubmit={handler}>
        <h1 style={{ color: "#4e0064" }}>Login</h1>
        <div className="input-box">
          <input type="email" placeholder="Email" required value={Email} onChange={(e)=>setEmail(e.target.value)} />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required value={Password} onChange={(e)=>setPassword(e.target.value)} />
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
       
        <button type="submit">Login</button>
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