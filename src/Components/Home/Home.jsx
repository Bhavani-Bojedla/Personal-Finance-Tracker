import React from "react";
import Layout from "../Navbar/Layout";
import "../Home/Home.css";
import { Link } from "react-router-dom";
import Income from "../Income/Income";
import { BrowserRouter, Route, Routes } from "react-router-dom";
export default function Home(props) {
  return (
    <Layout>
      <div className="home">
        <div className="home-left">
          <div className="home-head">
            Hello,
            <span style={{ color: "#913ce1" }}> User</span>
          </div>

          <p className="para">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat
            exercitationem delectus illum hic eaque facere corporis laborum
            quaerat blanditiis, nesciunt nostrum, dolor voluptates molestiae
            voluptatum fugit a, iste nam assumenda? Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </p>
          <Link className="link" to="/income">
            <button className="btn-1">INCOME</button>
          </Link>
          <Link className="link" to="/expenditure">
          <button className="btn-2">EXPENDITURE</button>
          </Link> 
          <div className="home-savings">Total Savings : 65,725/- </div>
        </div>
        <div className="home-right">
          <div className="home-right-img"></div>
        </div>
      </div>
    </Layout>
  );
}
