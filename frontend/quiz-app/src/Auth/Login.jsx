import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Auth.css"

export default function Login() {
  return (
    <div className="auth-container container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Login</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Your Email" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Your Password" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <p className="mt-3">
            Don't have an account? <NavLink to="/register">Register here</NavLink>
          </p>
        </div>
      </div>
    </div>
  )
}
