import React, { useState, useEffect } from "react";
import "../Expenditure/Expenditure.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const Expenditure = (props) => {
  const [expenditures, setExpenditures] = useState([]);
  const [expenditureText, setExpenditureText] = useState("");
  const [expenditureDate, setExpenditureDate] = useState("");
  const [expenditureCost, setExpenditureCost] = useState("");
  const [expenditureCategory, setExpenditureCategory] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`https://personal-finance-tracker-backend-hazel.vercel.app/expenditure/getexpenditure/${userId}`)
      .then((res) => {
        setExpenditures(res.data.expenditure);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  const handleAddExpenditure = () => {
    const inpObj = {
      ExpenditureText: expenditureText,
      ExpenditureDate: expenditureDate,
      ExpenditureCost: Number(expenditureCost),
      ExpenditureCategory: expenditureCategory,
      userId: userId,
    };

    axios
      .post("https://personal-finance-tracker-backend-hazel.vercel.app/expenditure/createexpenditure", inpObj)
      .then((res) => {
        alert("Expenditure added");
        setExpenditures((prev) => [...prev, res.data.expenditure]);
        setExpenditureText("");
        setExpenditureDate("");
        setExpenditureCost("");
        setExpenditureCategory("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteExpenditure = (id) => {
    axios
      .delete(`https://personal-finance-tracker-backend-hazel.vercel.app/expenditure/deleteexpenditure/${id}`, {
        data: { userId: userId },
      })
      .then((res) => {
        alert("Expenditure deleted successfully");
        setExpenditures(expenditures.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculateTotalExpenditure = () => {
    return expenditures.reduce((total, item) => total + Number(item.ExpenditureCost), 0);
  };

  const display = (data) => {
    return data.map((expenditure) => (
      <tr key={expenditure._id}>
        <td className="Ex-td">{expenditure.ExpenditureText}</td>
        <td className="Ex-td exp-cost">&#8377;{expenditure.ExpenditureCost}</td>
        <td className="Ex-td">{expenditure.ExpenditureDate}</td>
        <td className="Ex-td">{expenditure.ExpenditureCategory}</td>
        <td className="Ex-td">
          <button onClick={() => handleDeleteExpenditure(expenditure._id)} className="Exp-button">
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
            <h1 className="cat-heading">Expenditure</h1>
            <button>
                          <Link className="links" to="/home">
                            Go back to Home
                          </Link>
                        </button>
          </div>
          <h3>Total Expenditure is: &#8377; {calculateTotalExpenditure()}</h3>
          <h3>Total savings : &#8377;{props.calculateTotalSavings()}</h3>
          <div className="inc-details">
            <div className="Income-inputs">
              <input
                className="Ex-Txtinput"
                type="text"
                placeholder="Expenditure Title"
                value={expenditureText}
                onChange={(e) => setExpenditureText(e.target.value)}
              />
              <input
                type="number"
                placeholder="Cost"
                value={expenditureCost}
                onChange={(e) => setExpenditureCost(e.target.value)}
              />
              <select
                className="dropdown"
                value={expenditureCategory}
                onChange={(e) => setExpenditureCategory(e.target.value)}
              >
                <option value="">Select a Category</option>
                <option value="housing">Housing</option>
                <option value="food">Food</option>
                <option value="transportation">Transportation</option>
                <option value="clothes">Clothes</option>
                <option value="healthcare">Healthcare</option>
                <option value="entertainment">Entertainment</option>
                <option value="others">Others</option>
              </select>
              <input
                type="date"
                placeholder="Date"
                value={expenditureDate}
                onChange={(e) => setExpenditureDate(e.target.value)}
              />
              <button onClick={handleAddExpenditure}>Add Expenditure</button>
            </div>
            <table className="Inc-table">
              <thead>
                <tr className="EX-tr">
                  <th className="Ex-th">Expenditure</th>
                  <th className="Ex-th">&#8377;Cost</th>
                  <th className="Ex-th">Date</th>
                  <th className="Ex-th">Category</th>
                  <th className="Ex-th">Action</th>
                </tr>
              </thead>
              <tbody>{display(expenditures)}</tbody>
            </table>
          </div>
        </div>
        <div className="expenditure-image"></div>
      </div>
    </>
  );
};

export default Expenditure;
