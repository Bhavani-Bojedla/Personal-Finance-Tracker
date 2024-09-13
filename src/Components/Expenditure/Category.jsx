import React, { useState, useEffect } from "react";
import "./Expenditure.css";

const Category = ({ categoryName, onDelete, onUpdateTotalCost }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [Expenditures, setExpenditures] = useState([]);
  const [ExpenditureText, setExpenditureText] = useState("");
  const [ExpenditureDate, setExpenditureDate] = useState("");
  const [ExpenditureCost, setExpenditureCost] = useState("");

  useEffect(() => {
    const totalCost = Expenditures.reduce(
      (acc, Expenditure) => acc + parseFloat(Expenditure.cost),
      0
    );
    onUpdateTotalCost(categoryName, totalCost);
  }, [Expenditures, categoryName, onUpdateTotalCost]);

  const handleCategoryClick = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  const handleAddExpenditure = () => {
    if (ExpenditureText && ExpenditureDate && ExpenditureCost) {
      setExpenditures([
        ...Expenditures,
        {
          id: Date.now(),
          text: ExpenditureText,
          date: ExpenditureDate,
          cost: ExpenditureCost,
        },
      ]);
      setExpenditureText("");
      setExpenditureDate("");
      setExpenditureCost("");
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleDeleteCategory = () => {
    if (
      window.confirm(
        `Are you sure you want to delete category "${categoryName}"?`
      )
    ) {
      onDelete();
    }
  };

  const handleDeleteExpenditure = (ExpenditureId) => {
    const updatedExpenditures = Expenditures.filter(
      (Expenditure) => Expenditure.id !== ExpenditureId
    );
    setExpenditures(updatedExpenditures);
  };

  return (
    <div className="category">
      <div className="header">
        <h2 className="cat-heading" onClick={handleCategoryClick}>
          {categoryName} - 
          <small> &#8377;{Expenditures.reduce(
            (acc, item) => acc + parseFloat(item.cost),
            0
          ).toFixed(2)}</small>
        </h2>
        <button className="delete-button" onClick={handleDeleteCategory}>
          Del Category
        </button>
      </div>
      {isDetailsVisible && (
        <div className="cat-details">
          <div className="Expenditure-inputs">
            <input
              className="Ex-Txtinput"
              type="text"
              placeholder="Expenditure text"
              value={ExpenditureText}
              onChange={(e) => setExpenditureText(e.target.value)}
            />
            <input
              type="date"
              placeholder="Date"
              value={ExpenditureDate}
              onChange={(e) => setExpenditureDate(e.target.value)}
            />
            <input
              type="number"
              placeholder="Cost"
              value={ExpenditureCost}
              onChange={(e) => setExpenditureCost(e.target.value)}
            />
            <button onClick={handleAddExpenditure} className="Exp-button">
              Add Expenditure
            </button>
          </div>
          <table className="Ex-table">
            <thead>
              <tr className="Ex-tr">
                <th className="Ex-th">Expenditure</th>
                <th className="Ex-th">&#8377;Cost</th>
                <th className="Ex-th">Date</th>
                <th className="Ex-th">Action</th>
              </tr>
            </thead>
            <tbody>
              {Expenditures.map((Expenditure) => (
                <tr className="Ex-tr" key={Expenditure.id}>
                  <td className="Ex-td">{Expenditure.text}</td>
                  <td className="Ex-td">&#8377;{Expenditure.cost}</td>
                  <td className="Ex-td">{Expenditure.date}</td>
                  <td className="Ex-td">
                    <button
                      className="Exp-button"
                      onClick={() => handleDeleteExpenditure(Expenditure.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Category;