import React from 'react'
import { Link } from 'react-router-dom'
import "../Navbar/Navbar.css"
export default function Navbar() {
  return (
    <div className='navbar'>
      <Link to='/home' className='nav-left'>
      {/* <div style={{display:'flex',alignItems:'center',}}> */}
      <div className='nav-logo'></div>
      {/* <div style={{color:'white',width:'15rem',paddingLeft:'1rem',textDecoration:'none'}}>Personal-Finance-Tracker</div> */}
      {/* </div> */}
      </Link>
      <div className='nav-right'>
        <Link to='/home' className='nav-text'>
        <i className='bx bx-home nav-icon' ></i>Home</Link>
        <Link to='/history' className='nav-text'>
        <i className='bx bx-history nav-icon' ></i>History</Link>
        <Link to='/profile' className='nav-text'>
        <i className='bx bx-user-circle nav-icon' ></i>Profile</Link>
      </div>
    </div>
  )
}
