import React, { useEffect, useState } from "react";
import Layout from "../Navbar/Layout";
import "../Profile/Profile.css";
import axios from "axios";
export default function Profile() {
  const [users,setusers]=useState([]);
  useEffect(()=>{
    // const userId = localStorage.getItem("userId");
    // console.log(userId);
axios.get("https://personal-finance-tracker-backend-final.onrender.com/users/getusers")
.then((res)=>{
  console.log(res.data);
  setusers(res.data); 
}).catch((e)=>{ 
   console.log(e);
});
  },[]);
  const display=(data)=>{
    return data.map((user)=>{
      return(
        <div className="profile-box">
        <div className="profile-text">
          <div className="profile-text-1">FirstName</div>{" "}
          <div className="profile-details"> {user.Name}</div>
          <hr></hr>
        </div>
        <div className="profile-text" style={{ marginLeft: "0.5rem" }}>
          <div className="profile-text-1">Username</div>
          <div className="profile-details"> {user.Username}</div>
          <hr></hr>
        </div>
        <div className="profile-text">
          <div className="profile-text-1">Email</div>
          <div className="profile-details"> {user.Email}</div>
          <hr></hr>
        </div>
        <div className="profile-text">
          <div className="profile-text-1">Password</div>
          <div className="profile-details"> {user.Password}</div>
          <hr></hr>
        </div>
      </div>
      )
    })
  }
  
  return (
    <Layout>
      <div className="profile">
        <div className="profile-main">
          <div className="profile-left">
            <div className="profile-head">Your Profile</div>
              {display(users)}
            <button class="profile-btn-1">UPDATE</button>
            <button class="profile-btn-2">SAVE</button>
          </div>
          <div className="profile-right"></div>
        </div>
      </div>
    </Layout>
  );
}


// import React, { useEffect, useState } from "react";
// import Layout from "../Navbar/Layout";
// import "../Profile/Profile.css";
// import axios from "axios";

// export default function Profile() {
//   const [user, setUser] = useState({});

//   return (
//     <Layout>
//       <div className="profile">
//         <div className="profile-main">
//           <div className="profile-left">
//             <div className="profile-head">Your Profile</div>
//             <div className="profile-box">
//               <div className="profile-text">
//                 <div className="profile-text-1">First Name</div>
//                 <div className="profile-details">{user.Name}</div>
//                 {/* <div className="profile-details">Demo</div> */}
//                 <hr />
//               </div>
//               <div className="profile-text" style={{ marginLeft: "0.5rem" }}>
//                 <div className="profile-text-1">Last Name</div>
//                 <div className="profile-details">{user.Username}</div>
//                 {/* <div className="profile-details">Demo User</div> */}
//                 <hr />
//               </div>
//               <div className="profile-text">
//                 <div className="profile-text-1">Email</div>
//                 <div className="profile-details">{user.Email}</div>
//                 {/* <div className="profile-details">Demo@gmail.com</div> */}
//                 <hr />
//               </div>
//               <div className="profile-text">
//                 <div className="profile-text-1">Phone Number</div>
//                 <div className="profile-details">{user.Password}</div>
//                 {/* <div className="profile-details">123456789</div> */}
//                 <hr />
//               </div>
//             </div>
//             <button className="profile-btn-1">UPDATE</button>
//             <button className="profile-btn-2">SAVE</button>
//           </div>
//           <div className="profile-right"></div>
//         </div>
//       </div>
//     </Layout>
//   );
// }
