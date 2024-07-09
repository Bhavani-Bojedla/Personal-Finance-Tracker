import React, { useEffect } from "react";
import Layout from "../Navbar/Layout";
import axios from "axios";
import { useState } from "react";
import '../History/History.css'


export default function History() {
  const [incomes, setIncomes] = useState([]);
  const [expenditures, setExpenditures] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/income/getincomes")
      .then((res) => {
        console.log(res.data);
        setIncomes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/expenditure/getexpenditure")
      .then((res) => {
        console.log(res.data);
        setExpenditures(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const Indisplay = (data) => {
    return data.map((income) => {
      return (
        <tr>
          <td className="historydata">{income.IncomeText}</td>
          <td className="historydata cost">{income.IncomeCost}</td>
          <td className="historydata">{income.IncomeDate}</td>
        </tr>
      );
    });
  };
  const Exdisplay = (data) => {
    return data.map((expenditure) => (
      <tr key={expenditure._id}>
        <td className="historydata">{expenditure.ExpenditureText}</td>
        <td className="historydata exp-cost">&#8377;{expenditure.ExpenditureCost}</td>
        <td className="historydata">{expenditure.ExpenditureDate}</td>
      </tr>
    ));
  };

  return (
    <Layout>
      <div className="body-history">
      <h1 className="history">History</h1>
      <table className="historyTable">
        <thead>
          <tr className="historyRow">
            <th className="historyHead">Heading</th>
            <th className="historyHead ">Cost</th>
            <th className="historyHead">Date</th>
          </tr>
        </thead>
        <tbody>{Indisplay(incomes)} {Exdisplay(expenditures)}</tbody>
      </table>
      </div>
    </Layout>
  );
}