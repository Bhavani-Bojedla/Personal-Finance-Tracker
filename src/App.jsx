import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import History from "./Components/History/History";
import Profile from "./Components/Profile/Profile";
import Income from "./Components/Income/Income";
import Layout from "./Components/Navbar/Layout";
import Navbar from "./Components/Navbar/Navbar";
import Expenditure from "./Components/Expenditure/Expenditure";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import { Savings } from "./Savings";
import axios from "axios";
import { useEffect} from "react";

function App() {
  const [incomes, setIncomes] = useState([]);
  const [expenditures, setExpenditures] = useState([]);

  useEffect(() => {
    axios
      .get("https://personal-finance-tracker-backend-final.onrender.com/income/getincomes")
      .then((res) => {
        setIncomes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  const calculateTotalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.incomeCost;
    });
    return totalIncome;
  };

  const calculateTotalExpenditure = () => {
    let totalExpenditure = 0;
    expenditures.forEach((expenditure) => {
      totalExpenditure = totalExpenditure + expenditure.ExpenditureCost;
    });
    return totalExpenditure;
  };

  const calculateTotalSavings = () => {
    let totalSavings = 0;
    totalSavings = calculateTotalIncome() - calculateTotalExpenditure();
    return totalSavings;
  };
  return (
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/home"
          element={
            <Home
              calculateTotalIncome={calculateTotalIncome}
              calculateTotalExpenditure={calculateTotalExpenditure}
              calculateTotalSavings={calculateTotalSavings}
            />
          }
        />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/expenditure" element={<Expenditure calculateTotalSavings={calculateTotalSavings} />}></Route>
        <Route path="/income" element={<Income calculateTotalSavings={calculateTotalSavings}  />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
