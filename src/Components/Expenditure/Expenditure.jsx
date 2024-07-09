import React, { useState, useEffect } from "react";
import "../Expenditure/Expenditure.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

const Expenditure = (props) => {
  const [expenditures, setExpenditures] = useState([]);
  const [expenditureText, setExpenditureText] = useState("");
  const [expenditureDate, setExpenditureDate] = useState("");
  const [expenditureCost, setExpenditureCost] = useState("");
  const [expenditureCategory, setExpenditureCategory] = useState("");

  useEffect(() => {
    axios
      .get("https://personal-finance-tracker-backend-final.onrender.com/expenditure/getexpenditure")
      .then((res) => {
        setExpenditures(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAddExpenditure = () => {
    const inpObj = {
      ExpenditureText: expenditureText,
      ExpenditureDate: expenditureDate,
      ExpenditureCost: expenditureCost,
      ExpenditureCategory: expenditureCategory,
    };
    const url = "https://personal-finance-tracker-backend-final.onrender.com/expenditure/createexpenditure";

    axios
      .post(url, inpObj)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          alert("Expenditure added");
          window.location.reload();
          setExpenditures([...expenditures, res.data]);
        } else {
          return Promise.reject();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteExpenditure = (id) => {
    axios
      .delete("https://personal-finance-tracker-backend-final.onrender.com/expenditure/deleteexpenditure/" + id)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          alert("Expenditure deleted successfully");
          window.location.reload();
        } else {
          Promise.reject();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const display = (data) => {
    return data.map((expenditure) => (
      <tr key={expenditure._id}>
        <td className="Ex-td">{expenditure.ExpenditureText}</td>
        <td className="Ex-td exp-cost">&#8377;{expenditure.ExpenditureCost}</td>
        <td className="Ex-td">{expenditure.ExpenditureDate}</td>
        <td className="Ex-td">{expenditure.ExpenditureCategory}</td>
        <td className="Ex-td">
          <button
            onClick={() => handleDeleteExpenditure(expenditure._id)}
            className="Exp-button"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  const calculateTotalExpenditure = () => {
    let totalExpenditure = 0;
    expenditures.forEach((expenditure) => {
      totalExpenditure = totalExpenditure + expenditure.ExpenditureCost;
    });
    return totalExpenditure;
  };

  return (
    <>
      <Navbar />
      <div className="Income">
        <div className="div">
          <div className="class">
            <h1 className="cat-heading">Expenditure</h1>
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
                id="expenditure"
                name="expenditure"
                className="dropdown"
                value={expenditureCategory}
                onChange={(e) => setExpenditureCategory(e.target.value)}
              >
                <option value="Category">Select a Category</option>
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
