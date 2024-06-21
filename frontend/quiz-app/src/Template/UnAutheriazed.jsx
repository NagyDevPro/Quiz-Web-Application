import React from 'react'
import { Link } from 'react-router-dom'
import "./UnAutheriazed.css"
export default function UnAutheriazed() {
  return (
    <div className="notfo-container container mt-5 text-center">
      <h1 className="notfo-title"><i class="bi bi-ban"></i></h1>
      <p className="notfo-subtitle">Blocked</p>
      <p className="notfo-description">Sorry, You Must Login Before This Step</p>
      <Link to="/login" className='btn btn-primary fs-5 font-weight-bold rounded-pill'> Login</Link>
    </div>
  )
}
