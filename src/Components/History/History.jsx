import React, { useEffect, useState } from "react";
import Layout from "../Navbar/Layout";
import axios from "axios";
import "../History/History.css";

export default function History() {
  const [historyData, setHistoryData] = useState([]);
  const [activeTab, setActiveTab] = useState("day");

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomeRes, expenditureRes] = await Promise.all([
          axios.get(
            `https://personal-finance-tracker-backend-hazel.vercel.app/income/getincome/${userId}`,
          ),
          axios.get(
            `https://personal-finance-tracker-backend-hazel.vercel.app/expenditure/getexpenditure/${userId}`,
          ),
        ]);

        const incomes = (incomeRes.data.income || []).map((item) => ({
          id: item._id,
          type: "Income",
          title: item.IncomeText,
          cost: Number(item.IncomeCost),
          date: item.IncomeDate,
        }));

        const expenditures = (expenditureRes.data.expenditure || []).map(
          (item) => ({
            id: item._id,
            type: "Expenditure",
            title: item.ExpenditureText,
            cost: Number(item.ExpenditureCost),
            date: item.ExpenditureDate,
          }),
        );

        const combinedHistory = [...incomes, ...expenditures].sort(
          (a, b) => new Date(b.date) - new Date(a.date),
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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatMonth = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  const groupByDay = () => {
    const grouped = {};

    historyData.forEach((item) => {
      const day = new Date(item.date).toLocaleDateString("en-CA");

      if (!grouped[day]) {
        grouped[day] = [];
      }

      grouped[day].push(item);
    });

    return Object.entries(grouped).sort(
      ([dateA], [dateB]) => new Date(dateB) - new Date(dateA),
    );
  };

  const groupByMonth = () => {
    const grouped = {};

    historyData.forEach((item) => {
      const date = new Date(item.date);

      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1,
      ).padStart(2, "0")}`;

      if (!grouped[monthKey]) {
        grouped[monthKey] = {
          income: 0,
          expenditure: 0,
        };
      }

      if (item.type === "Income") {
        grouped[monthKey].income += item.cost;
      } else {
        grouped[monthKey].expenditure += item.cost;
      }
    });

    return Object.entries(grouped).sort(
      ([monthA], [monthB]) =>
        new Date(`${monthB}-01`) - new Date(`${monthA}-01`),
    );
  };

  const groupByMonthAndDay = () => {
    const grouped = {};

    historyData.forEach((item) => {
      const date = new Date(item.date);

      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1,
      ).padStart(2, "0")}`;

      const dayKey = date.toLocaleDateString("en-CA");

      if (!grouped[monthKey]) {
        grouped[monthKey] = {};
      }

      if (!grouped[monthKey][dayKey]) {
        grouped[monthKey][dayKey] = [];
      }

      grouped[monthKey][dayKey].push(item);
    });

    return Object.entries(grouped)
      .sort(
        ([monthA], [monthB]) =>
          new Date(`${monthB}-01`) - new Date(`${monthA}-01`),
      )
      .map(([month, days]) => ({
        month,
        days: Object.entries(days).sort(
          ([dayA], [dayB]) => new Date(dayB) - new Date(dayA),
        ),
      }));
  };

  const renderDayWise = () => {
    const groupedDays = groupByDay();

    const daysInOrder = [...groupedDays].reverse();

    let runningBalance = 0;

    const dailyData = daysInOrder.map(([day, transactions]) => {
      const todayIncome = transactions
        .filter((item) => item.type === "Income")
        .reduce((sum, item) => sum + item.cost, 0);

      const todayExpenditure = transactions
        .filter((item) => item.type === "Expenditure")
        .reduce((sum, item) => sum + item.cost, 0);

      runningBalance = runningBalance + todayIncome - todayExpenditure;

      return {
        day,
        transactions,
        todayIncome,
        todayExpenditure,
        balance: runningBalance,
      };
    });

    dailyData.reverse();

    return (
      <div className="history-content">
        {dailyData.length === 0 ? (
          <p className="no-data">No transaction history available.</p>
        ) : (
          dailyData.map(
            ({ day, transactions, todayIncome, todayExpenditure, balance }) => (
              <div className="history-group" key={day}>
                <h2 className="group-title">{formatDate(day)}</h2>

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
                    {/* TRANSACTIONS */}
                    {transactions.map((item) => (
                      <tr key={item.id}>
                        <td className="historydata">{item.type}</td>

                        <td className="historydata">{item.title}</td>

                        <td
                          className={`historydata ${
                            item.type === "Income" ? "cost" : "exp-cost"
                          }`}
                        >
                          {item.type === "Income" ? "+" : "-"}₹
                          {Math.abs(item.cost).toLocaleString("en-IN")}
                        </td>

                        <td className="historydata">{formatDate(item.date)}</td>
                      </tr>
                    ))}

                    {/* DAILY SUMMARY */}
                    <tr className="daily-summary-row">
                      <td colSpan="4">
                        <div className="daily-summary">
                          {/* TODAY'S INCOME */}
                          <div className="summary-item">
                            <span className="summary-label">
                              Today's Income
                            </span>
                            <span className="summary-value cost">
                              +₹
                              {todayIncome.toLocaleString("en-IN")}
                            </span>
                          </div>

                          {/* TODAY'S EXPENDITURE */}
                          <div className="summary-item">
                            <span className="summary-label">
                              Today's Expenditure
                            </span>

                            <span className="summary-value exp-cost">
                              -₹
                              {todayExpenditure.toLocaleString("en-IN")}
                            </span>
                          </div>

                          {/* TOTAL SAVINGS BALANCE */}
                          <div className="summary-item">
                            <span className="summary-label">Total Balance</span>

                            <span
                              className={`summary-value ${
                                balance >= 0 ? "cost" : "exp-cost"
                              }`}
                            >
                              {balance >= 0 ? "+" : "-"}₹
                              {Math.abs(balance).toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ),
          )
        )}
      </div>
    );
  };

  const renderMonthWise = () => {
    const groupedMonths = groupByMonth();

    return (
      <div className="history-content">
        {groupedMonths.length === 0 ? (
          <p className="no-data">No transaction history available.</p>
        ) : (
          groupedMonths.map(([month, data]) => {
            const balance = data.income - data.expenditure;

            return (
              <div className="month-card" key={month}>
                <h2 className="group-title">{formatMonth(`${month}-01`)}</h2>

                <div className="month-summary">
                  {/* INCOME */}
                  <div className="summary-box">
                    <span>Total Income</span>

                    <strong className="cost">
                      +₹{data.income.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  {/* EXPENDITURE */}
                  <div className="summary-box">
                    <span>Total Expenditure</span>

                    <strong className="exp-cost">
                      -₹{data.expenditure.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  {/* BALANCE */}
                  <div className="summary-box">
                    <span>Total Balance</span>

                    <strong className={balance >= 0 ? "cost" : "exp-cost"}>
                      {balance >= 0 ? "+" : "-"}₹
                      {Math.abs(balance).toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  };

  const renderMonthDayExpenditureWise = () => {
    const groupedData = groupByMonthAndDay();

    return (
      <div className="history-content">
        {groupedData.length === 0 ? (
          <p className="no-data">No transaction history available.</p>
        ) : (
          groupedData.map(({ month, days }) => (
            <div className="month-section" key={month}>
              <h2 className="month-title">{formatMonth(`${month}-01`)}</h2>

              {days.map(([day, transactions]) => {
                const expenditures = transactions.filter(
                  (item) => item.type === "Expenditure",
                );

                const income = transactions
                  .filter((item) => item.type === "Income")
                  .reduce((sum, item) => sum + item.cost, 0);

                const totalExpenditure = expenditures.reduce(
                  (sum, item) => sum + item.cost,
                  0,
                );

                return (
                  <div className="day-section" key={day}>
                    <h3 className="day-title">{formatDate(day)}</h3>

                    {/* INCOME */}
                    {income > 0 && (
                      <div className="income-line">
                        <span>Total Income</span>

                        <strong className="cost">
                          +₹{income.toLocaleString("en-IN")}
                        </strong>
                      </div>
                    )}

                    {/* EXPENDITURES */}
                    {expenditures.length > 0 ? (
                      <>
                        <div className="expenditure-list">
                          {expenditures.map((item) => (
                            <div className="expenditure-line" key={item.id}>
                              <span>{item.title}</span>

                              <strong className="exp-cost">
                                -₹
                                {item.cost.toLocaleString("en-IN")}
                              </strong>
                            </div>
                          ))}
                        </div>

                        {/* DAY EXPENDITURE TOTAL */}
                        <div className="day-total">
                          <span>Total Expenditure</span>

                          <strong className="exp-cost">
                            -₹
                            {totalExpenditure.toLocaleString("en-IN")}
                          </strong>
                        </div>
                      </>
                    ) : (
                      <p className="no-expenditure">
                        No expenditure on this day.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <Layout>
      <div className="body-history">
        <h1 className="history">History</h1>

        {/* TABS */}
        <div className="history-tabs">
          <button
            className={`history-tab ${activeTab === "day" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("day")}
          >
            Day Wise
          </button>

          <button
            className={`history-tab ${
              activeTab === "month" ? "active-tab" : ""
            }`}
            onClick={() => setActiveTab("month")}
          >
            Month Wise
          </button>

          <button
            className={`history-tab ${
              activeTab === "detailed" ? "active-tab" : ""
            }`}
            onClick={() => setActiveTab("detailed")}
          >
            Day + Month + Expenditure
          </button>
        </div>

        {/* CONTENT */}
        {activeTab === "day" && renderDayWise()}

        {activeTab === "month" && renderMonthWise()}

        {activeTab === "detailed" && renderMonthDayExpenditureWise()}
      </div>
    </Layout>
  );
}