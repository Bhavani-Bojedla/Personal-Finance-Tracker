import React from "react";
import Layout from "../Components/Layout";
import "../Pages/Home.css"
export default function Home() {
  return (
    <Layout>
      <div className="home">
        <h1 className="home-head">Hello, User</h1>
        <div className="home-main">
            <div className="home-left">
                <p className="para-1">Know you income here</p>
                <button class="btn-101">
  Income
  <svg>
    <defs>
      <filter id="glow">
        <fegaussianblur result="coloredBlur" stddeviation="5"></fegaussianblur>
        <femerge>
          <femergenode in="coloredBlur"></femergenode>
          <femergenode in="coloredBlur"></femergenode>
          <femergenode in="coloredBlur"></femergenode>
          <femergenode in="SourceGraphic"></femergenode>
        </femerge>
      </filter>
    </defs>
    <rect />
  </svg>
</button>
                <p className="para-2">Know you expenditure here</p>
                <button class="btn-101">
  Expenditure
  <svg>
    <defs>
      <filter id="glow">
        <fegaussianblur result="coloredBlur" stddeviation="5"></fegaussianblur>
        <femerge>
          <femergenode in="coloredBlur"></femergenode>
          <femergenode in="coloredBlur"></femergenode>
          <femergenode in="coloredBlur"></femergenode>
          <femergenode in="SourceGraphic"></femergenode>
        </femerge>
      </filter>
    </defs>
    <rect />
  </svg>
</button>
            </div>
            <div className="home-right">
                <div className="home-img"></div>
            </div>
        </div>
      </div>
    </Layout>
  );
}
