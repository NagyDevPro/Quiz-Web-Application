import React from 'react'
import './NotFound.css'
export default function NotFound() {
  return (
    <div className="notfound-container container mt-5 text-center">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-subtitle">Page Not Found</p>
      <p className="notfound-description">Sorry, the page you are looking for does not exist.</p>
    </div>
  )
}
