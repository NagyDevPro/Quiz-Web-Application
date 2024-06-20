import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className="container navBarContainer">
        <NavLink to='/'>
            <img className='homeIcon' src="https://cdn-icons-png.flaticon.com/512/2641/2641409.png" alt="" />
        </NavLink>
        <div className="mx-2 fs-5 d-flex justify-content-between" style={{ marginTop: "3%" ,width : "35%"}}>  
            <NavLink to="/login" className='nav-link'>
                <i className="bi bi-box-arrow-in-right mx-2 fs-5"></i> Login
            </NavLink>
            <NavLink to="/about" className='nav-link'>About Us</NavLink>
            <NavLink to="/contact" className='nav-link'>Contact Us</NavLink>
        </div>
    </div>
  )
}
