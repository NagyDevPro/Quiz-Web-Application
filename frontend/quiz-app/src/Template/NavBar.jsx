import React, { useEffect, useState } from 'react';
import './NavBar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Admin/redux/authRedux';

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('role') === "admin");

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
    setIsAdmin(localStorage.getItem('role') === "admin");
  }, [authState.isAuthenticated, authState.role]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsAdmin(false);
    setIsAuthenticated(false);
    navigate('/',{replace:true});
  };

  return (
    <div className="container navBarContainer">
      <NavLink to='/'>
        <img className='homeIcon' src="https://cdn-icons-png.flaticon.com/512/2641/2641409.png" alt="" />
      </NavLink>
      <div className="mx-2 fs-5 d-flex justify-content-between" style={{ marginTop: "3%", width: "40%" }}>
        {!isAuthenticated && (
          <NavLink to="/login" className='nav-link'>
            <i className="bi bi-box-arrow-in-right mx-2 fs-5"></i> Login
          </NavLink>
        )}
        {!isAdmin && (
          <>
            <NavLink to="/student-exams" className='nav-link'>Exams</NavLink>
            <NavLink to="/about" className='nav-link'>About Us</NavLink>
            <NavLink to="/contact" className='nav-link'>Contact Us</NavLink>
          </>
        )}
        {isAdmin && (
          <>
            <NavLink to="/exams" className='nav-link'>Exams</NavLink>
            <NavLink to="/list_all_exam_questions" className='nav-link'>Questions</NavLink>
          </>
        )}
        {isAuthenticated && (
          <button 
            className='nav-link btn btn-link' 
            onClick={handleLogout} 
            style={{ marginTop: "-2rem", marginRight: "-2rem", marginLeft: "-2rem" }}
          >
            <i className="bi bi-box-arrow-in-left mx-2 fs-5"></i> Logout
          </button>
        )}
      </div>
    </div>
  );
}
