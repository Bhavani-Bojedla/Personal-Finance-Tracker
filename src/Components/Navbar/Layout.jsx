import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "./Footer";
import "../Navbar/Navbar.css";
import "../Home/Home.css";
import Income from "../Income/Income";
export default function Layout(props) {
  return (
    <div className="layout-css">
      <Navbar />
   
      <main className="layout-main" style={{ height: "100vh" }}>{props.children}</main>
      <Footer />
    </div>
  );
}
