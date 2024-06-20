import React from 'react'
import "./Footer.css"
export default function Footer() {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              We are dedicated to providing you with the best quiz experiences.
              Our passion for quizzes drives us to turn hard work and inspiration
              into a booming online platform.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: info@quizapp.com</li>
              <li>Phone: +123 456 7890</li>
              <li>Address: 123 Quiz Street, Quiz City</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="/hello" className="text-dark"><i className="bi bi-facebook"></i> Facebook</a></li>
              <li><a href="here" className="text-dark"><i className="bi bi-twitter"></i> Twitter</a></li>
              <li><a href="is" className="text-dark"><i className="bi bi-instagram"></i> Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <p className="text-muted">&copy; 2024 Quiz Web Application. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
