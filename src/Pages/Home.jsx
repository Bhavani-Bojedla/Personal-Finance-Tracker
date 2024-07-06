import React from "react";
import Layout from "../Components/Layout";
import "../Pages/Home.css";
export default function Home() {
  return (
    <Layout>
      <div className="home">
      <div className="home-left">
        <div className="home-head">Hello, 
          <span style={{color:'#913ce1'}}> User</span></div>
          
        <p className="para">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat exercitationem delectus illum hic eaque facere corporis laborum quaerat blanditiis, nesciunt nostrum, dolor voluptates molestiae voluptatum fugit a, iste nam assumenda?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        </p>
        <button class="btn-1">
          INCOME
        </button>
        <button class="btn-2">EXPENDITURE</button>
        <div className="home-savings">Total Savings : 65,725/- </div>
        </div>
        <div className="home-right">
          <div className="home-right-img"></div>
        </div>
       </div>
    </Layout>
  );
}
