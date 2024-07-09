
import React from "react";
import Layout from "../Navbar/Layout";
import "../Home/Home.css";
import { Link } from "react-router-dom";
export default function Home(props) {
  return (
    <Layout>
      <div className="home">
        <div className="home-left">
          <div className="home-head">
            Hello,
            <span style={{ color: "#913ce1" }}> User &#128075;</span>
          </div>
          <p className="para">
            Welcome to Your Personal Finance Tracker ! <br />
            Track, Manage, Save Stay on top of your finances with ease. Monitor
            your spending, set budgets, and achieve your savings goals. <br />{" "}
            <br /> Get Started Today!
          </p>
          <div className="buttons-div">
            <Link className="links" to="/income">
              <button className="btn-1">INCOME</button>
            </Link>
            <Link className="link" to="/expenditure">
              <button className="btn-2">EXPENDITURE</button>
            </Link>
          </div>
          <div className="details-box">
            <div className="home-savings">
              Total Savings{" "}
              <strong>&#8377;{props.calculateTotalSavings()} </strong>
            </div>
            <div className="home-savings">
              Total Income{" "}
              <strong>&#8377;{props.calculateTotalIncome()} </strong>
            </div>
            <div className="home-savings">
              Total Expenditure{" "}
              <strong>&#8377;{props.calculateTotalExpenditure()} </strong>
            </div>
          </div>{" "}
        </div>
        <div className="home-right">
          <div className="home-right-img"></div>
        </div>
      </div>
    </Layout>
  );
}
