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

    let url1="http://localhost:4000/login/createlogin";
    axios.post(url1,inputObj).then((res)=>{
      if(res.status===200){
        alert("login succesfull");
      }
      else{
        Promise.reject();
      }
    }).catch(e=>{console.log(e)})







    let url="http://localhost:4000/users/checkuser";
    axios.post(url,inputObj)
    .then((res)=>{ console.log(res)
      if(res.status===200){
        window.location.href = "/home";
      }
      else{     
        Promise.reject();  
      }
    }).catch((e)=>{
      if (e.response && e.response.status === 400) {
        alert(e.response.data); 
      } else {
        console.log(e);
      }
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