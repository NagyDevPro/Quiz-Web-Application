import React, { useEffect } from 'react';
import './assets/HomePage.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';


export default function HomePage() {
    const authState = useSelector((state) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, [authState.isAuthenticated, authState.role]);
  return (
    <div className="homepage-container container mt-5 text-center">
      <h1 className="homepage-title">Welcome to IEXAM</h1>
      <p className="homepage-subtitle">Your first way of success in your career</p>
      <img 
        src="https://img.freepik.com/premium-photo/young-asian-indian-student-with-glasses-backpack-holds-book-shows-thumbs-up_928503-89.jpg" 
        alt="Student" 
        className="homepage-image img-fluid" 
      />
      
      {!isAuthenticated && (
        <div className="mt-4 buttonsContainer">
          <a href="/login" className="btn btn-primary d-block w-50 h-50 mt-3">Login</a>
          <a href="/register" className="btn btn-secondary d-block w-50 h-50 my-4">Register</a>
        </div>
      )}
    </div>
  );
}
