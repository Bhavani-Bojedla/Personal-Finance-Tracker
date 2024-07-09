// SavingsContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const Savings = createContext();

export const SavingsProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenditures, setExpenditures] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenditure, setTotalExpenditure] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/income/getincomes');
        setIncomes(response.data);
        const total = response.data.reduce((sum, income) => sum + income.IncomeCost, 0);
        setTotalIncome(total);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchExpenditures = async () => {
      try {
        const response = await axios.get('http://localhost:4000/expenditure/getexpenditure');
        setExpenditures(response.data);
        const total = response.data.reduce((sum, expenditure) => sum + expenditure.ExpenditureCost, 0);
        setTotalExpenditure(total);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIncomes();
    fetchExpenditures();
  }, []);

  useEffect(() => {
    setTotalSavings(totalIncome - totalExpenditure);
  }, [totalIncome, totalExpenditure]);

  return (
    <Savings.Provider value={{ totalIncome, totalExpenditure, totalSavings }}>
      {children}
    </Savings.Provider>
  );
};
