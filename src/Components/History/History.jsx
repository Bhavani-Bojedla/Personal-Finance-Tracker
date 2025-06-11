import React, { useEffect, useState } from "react";
import Layout from "../Navbar/Layout";
import axios from "axios";
import "../History/History.css";

export default function History() {
  const [historyData, setHistoryData] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomeRes, expenditureRes] = await Promise.all([
          axios.get(`https://personal-finance-tracker-backend-hazel.vercel.app/income/getincome/${userId}`),
          axios.get(`https://personal-finance-tracker-backend-hazel.vercel.app/expenditure/getexpenditure/${userId}`)
        ]);

        const incomes = (incomeRes.data.income || []).map((item) => ({
          id: item._id,
          type: "Income",
          title: item.IncomeText,
          cost: Number(item.IncomeCost),
          date: item.IncomeDate,
        }));

        const expenditures = (expenditureRes.data.expenditure || []).map((item) => ({
          id: item._id,
          type: "Expenditure",
          title: item.ExpenditureText,
          cost: -Number(item.ExpenditureCost), // use negative to differentiate visually
          date: item.ExpenditureDate,
        }));

        const combinedHistory = [...incomes, ...expenditures].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setHistoryData(combinedHistory);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <Layout>
      <div className="body-history">
        <h1 className="history">History</h1>
        <table className="historyTable">
          <thead>
            <tr className="historyRow">
              <th className="historyHead">Type</th>
              <th className="historyHead">Title</th>
              <th className="historyHead">Amount (₹)</th>
              <th className="historyHead">Date</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item) => (
              <tr key={item.id}>
                <td className="historydata">{item.type}</td>
                <td className="historydata">{item.title}</td>
                <td className={`historydata ${item.cost < 0 ? "exp-cost" : "cost"}`}>
                  ₹{Math.abs(item.cost)}
                </td>
                <td className="historydata">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
