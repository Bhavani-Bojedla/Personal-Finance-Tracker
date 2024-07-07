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

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/expenditure" element={<Expenditure />}></Route>
        <Route path="/income" element={<Income />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
