// import React, { useEffect, useState } from "react";
// import Layout from "../Navbar/Layout";
// import "../Profile/Profile.css";
// import axios from "axios";
// export default function Profile() {
//   const [users,setusers]=useState([]);
//   useEffect(()=>{
// axios.get("http://localhost:4000/users/getusers")
// .then((res)=>{
//   console.log(res.data);
//   setusers(res.data); 
// }).catch((e)=>{ 
//    console.log(e);
// });
//   },[]);
//   const display=(data)=>{
//     return data.map((user)=>{
//       return(
//         <div className="profile-box">
//         <div className="profile-text">
//           <div className="profile-text-1">FirstName</div>{" "}
//           <div className="profile-details"> {user.Name}</div>
//           <hr></hr>
//         </div>
//         <div className="profile-text" style={{ marginLeft: "0.5rem" }}>
//           <div className="profile-text-1">LastName</div>
//           <div className="profile-details"> {user.Username}</div>
//           <hr></hr>
//         </div>
//         <div className="profile-text">
//           <div className="profile-text-1">Email</div>
//           <div className="profile-details"> {user.Email}</div>
//           <hr></hr>
//         </div>
//         <div className="profile-text">
//           <div className="profile-text-1">PhoneNumber</div>
//           <div className="profile-details"> {user.Password}</div>
//           <hr></hr>
//         </div>
//       </div>
//       )
//     })
//   }
  
//   return (
//     <Layout>
//       <div className="profile">
//         <div className="profile-main">
//           <div className="profile-left">
//             <div className="profile-head">Your Profile</div>
//               {display(users)}
//             <button class="profile-btn-1">UPDATE</button>
//             <button class="profile-btn-2">SAVE</button>
//           </div>
//           <div className="profile-right"></div>
//         </div>
//       </div>
//     </Layout>
//   );
// }


import React, { useEffect, useState } from "react";
import Layout from "../Navbar/Layout";
import "../Profile/Profile.css";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); // or however you store your token
        const res = await axios.get("http://localhost:4000/users/getusers", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data);
      } catch (e) { 
        console.log(e);
      }
    };

    fetchUser();
  }, []);

  return (
    <Layout>
      <div className="profile">
        <div className="profile-main">
          <div className="profile-left">
            <div className="profile-head">Your Profile</div>
            <div className="profile-box">
              <div className="profile-text">
                <div className="profile-text-1">First Name</div>
                <div className="profile-details">{user.Name}</div>
                <hr />
              </div>
              <div className="profile-text" style={{ marginLeft: "0.5rem" }}>
                <div className="profile-text-1">Last Name</div>
                <div className="profile-details">{user.Username}</div>
                <hr />
              </div>
              <div className="profile-text">
                <div className="profile-text-1">Email</div>
                <div className="profile-details">{user.Email}</div>
                <hr />
              </div>
              <div className="profile-text">
                <div className="profile-text-1">Phone Number</div>
                <div className="profile-details">{user.Password}</div>
                <hr />
              </div>
            </div>
            <button className="profile-btn-1">UPDATE</button>
            <button className="profile-btn-2">SAVE</button>
          </div>
          <div className="profile-right"></div>
        </div>
      </div>
    </Layout>
  );
}
