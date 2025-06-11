import React, { useState, useEffect } from "react";
import "./Income.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

const Income = (props) => {
  const [incomeText, setIncomeText] = useState("");
  const [incomeCost, setIncomeCost] = useState("");
  const [incomeDate, setIncomeDate] = useState("");
  const [incomes, setIncomes] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`https://personal-finance-tracker-backend-hazel.vercel.app/income/getincome/${userId}`)
      .then((res) => setIncomes(res.data.income))
      .catch((error) => console.log(error));
  }, [userId]);

  const handleAddIncome = () => {
    const newIncome = {
      IncomeText: incomeText,
      IncomeCost: Number(incomeCost),
      IncomeDate: incomeDate,
      userId: userId,
    };

    axios
      .post("https://personal-finance-tracker-backend-hazel.vercel.app/income/createincome", newIncome)
      .then((res) => {
        alert("Income added");
        setIncomes((prev) => [res.data, ...prev]);
        setIncomeText("");
        setIncomeCost("");
        setIncomeDate("");
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteIncome = (id) => {
    axios
      .delete(`https://personal-finance-tracker-backend-hazel.vercel.app/income/deleteincome/${id}`)
      .then(() => {
        alert("Income deleted successfully");
        setIncomes((prev) => prev.filter((income) => income._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const calculateTotalIncome = () => {
    return incomes.reduce((sum, income) => sum + Number(income.IncomeCost), 0);
  };

  const display = (data) => {
    return data.map((income) => (
      <tr key={income._id}>
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
    ));
  };

  return (
    <>
      <Navbar />
      <div className="Income ">
        <div className="div">
          <div className="class">
            <h1 className="cat-heading">Income</h1>
            <button>
              <Link className="links" to="/home">
                Go back to Home
              </Link>
            </button>
          </div>
          <h3>Total Income: &#8377;{calculateTotalIncome()}</h3>
          <h3>Total Savings: &#8377;{props.calculateTotalSavings()}</h3>

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
                value={incomeDate}
                onChange={(e) => setIncomeDate(e.target.value)}
              />
              <button onClick={handleAddIncome}>Add Income</button>
            </div>

            <table className="Inc-table">
              <thead>
                <tr className="Inc-tr">
                  <th className="Inc-th">Income</th>
                  <th className="Inc-th">&#8377; Cost</th>
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
