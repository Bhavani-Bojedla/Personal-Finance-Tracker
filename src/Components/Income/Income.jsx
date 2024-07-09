import React, { useState } from "react";
import "./Income.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useEffect } from "react";

const Income = (props) => {
  const [incomeText, setIncomeText] = useState("");
  const [incomeCost, setIncomeCost] = useState("");
  const [incomeDate, setIncomeDate] = useState(""); 
  const [incomes, setIncomes] = useState([]);
  const [expenditures, setExpenditures] = useState([]);


  useEffect(() => {
    axios
      .get("https://personal-finance-tracker-backend-final.onrender.com/income/getincomes")
      .then((res) => {
        console.log(res.data);
        setIncomes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  const handleAddIncome = () => {
    let inpObj = {IncomeText: incomeText, IncomeCost:incomeCost, IncomeDate:incomeDate };
    const Url = "https://personal-finance-tracker-backend-final.onrender.com/income/createincome";
    axios
      .post(Url, inpObj)
      .then((res) => {
        if (res.status === 200) {
          alert("Income added");
           window.location.reload();
           setIncomes([...incomes, res.data]);
        } else {
          Promise.reject();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteIncome = (id) => {
    axios
      .delete("https://personal-finance-tracker-backend-final.onrender.com/income/deleteincome/" + id)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          alert("Income deleted successfully");
          window.location.reload();
        } else {
          Promise.reject();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculateTotalIncome = () => {
    let totalIncome=0;
    incomes.forEach((income)=>{
      totalIncome= totalIncome + income.IncomeCost;
    })
    return totalIncome;
  };


  const display = (data) => {
    return data.map((income) => {
      return (
        <tr>
          <td className="Inc-td">{income.IncomeText}</td>
          <td className="Inc-td cost">&#8377;{income.IncomeCost}</td>
          <td className="Inc-td">{income.IncomeDate}</td>
          <td className="Inc-td">
            <button
              onClick={() => handleDeleteIncome(income._id)}
              className="Exp-button"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <Navbar />
      <div className="Income lenght">
        <div className="div">
          <div className="class">
            <h1 className="cat-heading">Income</h1>
            <button>
              <Link className="links" to="/home">
                Go back to Home
              </Link> 
            </button>
          </div>
          <h3>Total Income : &#8377;{calculateTotalIncome()}</h3>
          <h3>Total savings : &#8377;{props.calculateTotalSavings()}</h3>
          <div className="inc-details">
            <div className="Income-inputs">
              <input
                className="Ex-Txtinput"
                type="text"
                placeholder="Income text"
                value={incomeText}
                onChange={(e) => setIncomeText(e.target.value)}
              />
              <input
                type="number"
                placeholder="Cost"
                value={incomeCost}
                onChange={(e) => setIncomeCost(e.target.value)}
              />
              <input
                type="date"
                placeholder="Date"
                style={{ width: "18px" }}
                value={incomeDate}
                onChange={(e) => setIncomeDate(e.target.value)}
              />
              <button onClick={handleAddIncome}>Add Income</button>
            </div>
            <table className="Inc-table">
              <thead>
                <tr className="Inc-tr">
                  <th className="Inc-th">Income</th>
                  <th className="Inc-th">&#8377;Cost</th>
                  <th className="Inc-th">Date</th>
                  <th className="Inc-th">Action</th>
                </tr>
              </thead>
              <tbody>{display(incomes)}</tbody>
            </table>
          </div>
        </div>
        <div className="Income-image"></div>
      </div>
    </>
  );
};

export default Income;