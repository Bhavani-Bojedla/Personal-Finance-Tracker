import React, { useEffect, useState } from "react";
import Layout from "../Navbar/Layout";
import "../Profile/Profile.css";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    Username: "",
    Email: "",
    Password: "",
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`https://personal-finance-tracker-backend-hazel.vercel.app/users/getuser/${userId}`)
      .then((res) => {
        setUser(res.data.user);
        setFormData({
          Name: res.data.user.Name,
          Username: res.data.user.Username,
          Email: res.data.user.Email,
          Password: "", // Blank unless editing
        });
      })
      .catch((err) => console.error(err));
  }, [userId]);

  const handleUpdate = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `https://personal-finance-tracker-backend-hazel.vercel.app/users/updateuser/${userId}`,
        formData
      );

      const updatedUserRes = await axios.get(
        `https://personal-finance-tracker-backend-hazel.vercel.app/users/getuser/${userId}`
      );

      setUser(updatedUserRes.data.user);
      setEditMode(false);
      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <div className="profile">
        <div className="profile-main">
          <div className="profile-left">
            <div className="profile-head">Your Profile</div>
            <div className="profile-box">
              <div className="profile-text">
                <div className="profile-text-1">First Name</div>
                {editMode ? (
                  <input
                    type="text"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    className="profile-input"
                  />
                ) : (
                  <div className="profile-details">{user.Name}</div>
                )}
                <hr />
              </div>

              <div className="profile-text" style={{ marginLeft: "0.5rem" }}>
                <div className="profile-text-1">Last Name</div>
                {editMode ? (
                  <input
                    type="text"
                    name="Username"
                    value={formData.Username}
                    onChange={handleChange}
                    className="profile-input"
                  />
                ) : (
                  <div className="profile-details">{user.Username}</div>
                )}
                <hr />
              </div>

              <div className="profile-text">
                <div className="profile-text-1">Email</div>
                {editMode ? (
                  <input
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    className="profile-input"
                  />
                ) : (
                  <div className="profile-details">{user.Email}</div>
                )}
                <hr />
              </div>

              <div className="profile-text">
                <div className="profile-text-1">Password</div>
                {editMode ? (
                  <input
                    type="password"
                    name="Password"
                    value={formData.Password}
                    onChange={handleChange}
                    className="profile-input"
                    placeholder="Enter new password"
                  />
                ) : (
                  <div className="profile-details">********</div>
                )}
                <hr />
              </div>
            </div>

            {!editMode && (
              <button className="profile-btn-1" onClick={handleUpdate}>
                UPDATE
              </button>
            )}
            {editMode && (
              <button className="profile-btn-2" onClick={handleSave}>
                SAVE
              </button>
            )}
          </div>

          <div className="profile-right"></div>
        </div>
      </div>
    </Layout>
  );
}
