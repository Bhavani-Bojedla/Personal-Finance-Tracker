// import React from "react";
// import Layout from "../Components/Layout";
// import "../Pages/Profile.css";
// export default function Profile() {
//   return (
//     <Layout>
//       <div className="profile">
//         <div className="profile-head">Your Profile</div>
//         <div className="profile-main">
//           <div className="profile-left">
//             <div className="profile-text">
//               FirstName : <span className="profile-details"> Bhavani</span>{" "}
//             </div>
//             <div className="profile-text">
//               Lastname : <span className="profile-details"> Bojedla</span>
//             </div>
//             <div className="profile-text">
//               Email : <span className="profile-details"> abc@gmail.com</span>
//             </div>
//             <div className="profile-text">
//               PhoneNumber : <span className="profile-details"> 1234567890</span>
//             </div>
//             <button class="profile-btn-1">UPDATE</button>
//             <button class="profile-btn-2">SAVE</button>
//           </div>
//           <div className="profile-right"></div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

import React from "react";
import Layout from "../Navbar/Layout";
import "../Profile/Profile.css";
export default function Profile() {
  return (
    <Layout>
      <div className="profile">
        <div className="profile-main">
          <div className="profile-left">
            <div className="profile-head">Your Profile</div>
            <div className="profile-box">
              <div className="profile-text">
                <div className="profile-text-1">FirstName</div>{" "}
                <div className="profile-details"> Bhavani</div>
                <hr></hr>
              </div>
              <div className="profile-text" style={{ marginLeft: "0.5rem" }}>
                <div className="profile-text-1">LastName</div>
                <div className="profile-details"> Bojedla</div>
                <hr></hr>
              </div>
              <div className="profile-text">
                <div className="profile-text-1">Email</div>
                <div className="profile-details"> abc@gmail.com</div>
                <hr></hr>
              </div>
              <div className="profile-text">
                <div className="profile-text-1">PhoneNumber</div>
                <div className="profile-details"> 1234567890</div>
                <hr></hr>
              </div>
            </div>
            <button class="profile-btn-1">UPDATE</button>
            <button class="profile-btn-2">SAVE</button>
          </div>
          <div className="profile-right"></div>
        </div>
      </div>
    </Layout>
  );
}
