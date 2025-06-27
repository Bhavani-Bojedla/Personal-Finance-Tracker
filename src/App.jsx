import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import History from "./Components/History/History";
import Profile from "./Components/Profile/Profile";
import Income from "./Components/Income/Income";
import Expenditure from "./Components/Expenditure/Expenditure";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import ProtectedRoute from "./protectedroute";
import axios from "axios";

function App() {
  const [incomes, setIncomes] = useState([]);
  const [expenditures, setExpenditures] = useState([]);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    axios
      .get(`https://personal-finance-tracker-backend-hazel.vercel.app/income/getincome/${userId}`)
      .then((res) => setIncomes(res.data.income || []))
      .catch((error) => console.log(error));
      console.log(incomes)
  }, [userId]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`https://personal-finance-tracker-backend-hazel.vercel.app/expenditure/getexpenditure/${userId}`)
        .then((res) => setExpenditures(res.data.expenditure || []))
        .catch(console.error);
    }
    console.log(expenditures)
  }, [userId]);

 
  const calculateTotalIncome = () => {
    return (incomes || []).reduce((sum, income) => sum + Number(income.IncomeCost), 0);
  };

  const calculateTotalExpenditure = () =>
    expenditures.reduce((sum, exp) => sum + Number(exp.ExpenditureCost), 0);

  const calculateTotalSavings = () =>
    calculateTotalIncome() - calculateTotalExpenditure();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home
                calculateTotalIncome={calculateTotalIncome}
                calculateTotalExpenditure={calculateTotalExpenditure}
                calculateTotalSavings={calculateTotalSavings}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/income"
          element={
            <ProtectedRoute>
              <Income calculateTotalSavings={calculateTotalSavings} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenditure"
          element={
            <ProtectedRoute>
              <Expenditure calculateTotalSavings={calculateTotalSavings} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
