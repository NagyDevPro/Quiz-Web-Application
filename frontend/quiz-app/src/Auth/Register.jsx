import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { registerUser } from '../Admin/redux/authRedux';
import "./Auth.css";

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const routeTo = useNavigate();
  
  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length <= 8) {
      errors.password = 'Password must be more than 8 characters';
    }
    setErrors(errors);
    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors.email || validationErrors.name || validationErrors.password) {
       setErrors(validationErrors);
    } else {
      dispatch(registerUser(formData));
      routeTo('/login');
    }
  };

  return (
    <div className="auth-container container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                placeholder="Your Password" 
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
          <p className="mt-3">
            Already have an account? <NavLink to="/login">Login here</NavLink>
          </p>
          {authState.error && <div className="text-danger mt-3">{authState.error.message}</div>}
        </div>
      </div>
    </div>
  );
}
