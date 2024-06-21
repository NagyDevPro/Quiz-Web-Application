import React from 'react'
import { NavLink } from 'react-router-dom'

import "./Auth.css"

export default function Register() {
  return (
     <div className="auth-container container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Register</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Your Name" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Your Email" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Your Password" />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
          <p className="mt-3">
            Already have an account? <NavLink to="/login">Login here</NavLink>
          </p>
        </div>
      </div>
    </div>
  )
}
