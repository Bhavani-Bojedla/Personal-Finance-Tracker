import React from 'react'
import { Link } from 'react-router-dom'
import "../Components/Navbar.css"
export default function Navbar() {
  return (
    <div className='navbar'>
      <Link to='/' className='nav-left'>
      <div className='nav-logo'></div>
      </Link>
      <div className='nav-right'>
        <Link to='/' className='nav-text'>
        <i className='bx bx-home nav-icon' ></i>Home</Link>
        <Link to='/history' className='nav-text'>
        <i className='bx bx-history nav-icon' ></i>History</Link>
        <Link to='/profile' className='nav-text'>
        <i className='bx bx-user-circle nav-icon' ></i>Profile</Link>
      </div>
    </div>
  )
}
