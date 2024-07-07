import React, { useState,useEffect } from "react";
import Category from "./Category";
import "./Expenditure.css";
import { Link } from "react-router-dom";

const Expenditure = () => {
  const [categories, setCategories] = useState([
    { name: "Food", totalCost: 0 },
    { name: "Clothes", totalCost: 0 },
    { name: "Health", totalCost: 0 },
    { name: "Others", totalCost: 0 },
  ]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([...categories, { name: newCategory, totalCost: 0 }]);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (categoryName) => {
    const updatedCategories = categories.filter(
      (category) => category.name !== categoryName
    );
    setCategories(updatedCategories);
  };

  
  const updateTotalCost = (categoryName, totalCost) => {
    const updatedCategories = categories.map((category) =>
      category.name === categoryName ? { ...category, totalCost } : category
    );
    setCategories(updatedCategories);
  };

  // const totalExpenditure = categories.reduce(
  //   (acc, category) => acc + category.totalCost,
  //   0
  // );
  useEffect(() => {
    const totalExpenditure = categories.reduce(
      (acc, category) => acc + category.totalCost,
      0
    );
    console.log("Total Expenditure: ", totalExpenditure);
  }, [categories]);
  
  

  return (
    <div className="expenditure-container">
      <div className="expenditure-content">
        <div className="class">
          <h1 className="cat-heading">Select or Add Category</h1>
          <button>
            <Link className="links" to="/">
              Go back to Home
            </Link>
          </button>
        </div>
        <div className="total-cost">
          <h3>Total Expenditure: &#8377;{totalExpenditure.toFixed(2)}/-</h3>
        </div>
        <input
          className="inputs"
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter new category"
        />
        <button onClick={handleAddCategory}>Add Category</button>
        <ul>
          {categories.map((category, index) => (
            <div key={index}>
              <Category
                categoryName={category.name}
                onDelete={() => handleDeleteCategory(category.name)}
                onUpdateTotalCost={updateTotalCost}
              />
            </div>
          ))}
        </ul>
      </div>

      <div className="expenditure-image"></div>
    </div>
  );
};

export default Expenditure;