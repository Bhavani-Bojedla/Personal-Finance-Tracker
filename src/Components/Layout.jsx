import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import "../Components/Navbar.css"
import "../Pages/Home.css"
export default function Layout(props) {
  return (
    <div className='layout-css'>
      <Navbar/>
      <main style={{height:'100vh'}}>{props.children}</main>
      <Footer/>
    </div>
  )
}
