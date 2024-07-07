import React from 'react';
import "./History.css";
import Layout from "../Navbar/Layout";
const History = () => {

  return (
    <Layout>
      <div className="content">
        <div className="text"> 
        <h1>History</h1>
        <table >
          <thead>
            <tr>
              <th>Name of Income/Expenditure</th>
              <th>Date</th>
            </tr>
          </thead>
        </table>
        <div>
          <h2>Total Savings:</h2>
        </div>
        </div>
    </div>
    </Layout>
  );
};


export default History;