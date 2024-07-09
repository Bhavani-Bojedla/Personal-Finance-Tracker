import React , { useState , useEffect } from "react";
import Layout from "../Navbar/Layout";
import "../Home/Home.css";
import { Link } from "react-router-dom";
import "../Income/Income";
import axios from "axios";
import Income from "../Income/Income";
import { BrowserRouter, Route, Routes } from "react-router-dom";
export default function Home() {
  const [name,setname]=useState("");
  const [incomes, setIncomes] = useState([]);
  const [expenditures, setExpenditures] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/income/getincomes")
      .then((res) => {
        console.log(res.data);
        setIncomes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:4000/expenditure/getexpenditure")
      .then((res) => {
        console.log(res.data);
        setExpenditures(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const calculateTotalIncome = () => {
    let totalIncome=0;
    incomes.forEach((income)=>{
      totalIncome= totalIncome + income.IncomeCost;
    })
    return totalIncome;
  };
  const calculateTotalExpenditure = () => {
    let totalExpenditure = expenditures.reduce((total, expenditure) => total + parseFloat(expenditure.ExpenditureCost), 0);
    return totalExpenditure.toFixed(2);
  };
  const calculateTotalSavings = () => {
    let totalIncome = parseFloat(calculateTotalIncome());
    let totalExpenditure = parseFloat(calculateTotalExpenditure());
    return (totalIncome - totalExpenditure).toFixed(2);
  };
  


  return (
    <Layout>
      <div className="home">
        <div className="home-left">
          <div className="home-head">
            Hello,
            <span style={{ color: "#913ce1" }}>User</span>
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
          <div className="home-savings">Total Savings :  &#8377;{calculateTotalSavings()} </div>
        </div>
        <div className="home-right">
          <div className="home-right-img"></div>
        </div>
      </div>
    </Layout>
  );
}
