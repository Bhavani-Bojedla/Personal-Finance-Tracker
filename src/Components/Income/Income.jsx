import React, { useState } from "react";
import "./Income.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../Navbar/Layout";

const Income = () => {
  const [incomeText, setIncomeText] = useState("");
  const [incomeCost, setIncomeCost] = useState("");
  const [incomeDate, setIncomeDate] = useState("");
  const [incomes, setIncomes] = useState([]);

  const handleAddIncome = (event) => {
    let inputObj = { incomeText, incomeCost, incomeDate };
    console.log(inputObj);
    let url="http://localhost:4000/incomes/createincome";
    axios.post(url,inputObj).then((res)=>{
      if(res.status===200){
        alert("user created")
      }
      else{
        Promise.reject();
      }
    }).catch((e)=>{
      console.log(e)
    });
    event.preventDefault();
    if (incomeText && incomeCost && incomeDate) {
      const newIncome = {
        id: Date.now(),
        text: incomeText,
        cost: parseFloat(incomeCost),
        date: incomeDate,
      };

      setIncomes([...incomes, newIncome]);
      setIncomeText("");
      setIncomeCost("");
      setIncomeDate("");
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleDeleteIncome = (incomeId) => {
    const updatedIncomes = incomes.filter((income) => income.id !== incomeId);
    setIncomes(updatedIncomes);
  };

  const calculateTotalIncome = () => {
    return incomes.reduce((total, income) => total + income.cost, 0).toFixed(2);
  };

  return (
    <Layout>
    <div className="Income"> 
      <div className="div">
        <div className="class">
          <h1 className="cat-heading">Income</h1>
        </div>
        <h3>Total Income is: &#8377;{calculateTotalIncome()}</h3>
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
            <tbody>
              {incomes.map((income) => (
                <tr key={income.id} className="Inc-tr table-rows">
                  <td className="Inc-td">{income.text}</td>
                  <td className="Inc-td">{income.date}</td>
                  <td className="Inc-td">&#8377;{income.cost}</td>
                  <td className="Inc-td">
                    <button
                      onClick={() => handleDeleteIncome(income.id)}
                      className="Exp-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="Income-image"></div>
    </div>
    </Layout>
  );
};

export default Income;
