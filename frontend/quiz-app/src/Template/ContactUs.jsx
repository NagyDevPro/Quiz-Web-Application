import React from 'react'
import './ContactUs.css'
export default function ContactUs() {
  return (
    <div className="contact-us-container container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Contact Us</h2>
          <p>
            If you have any questions, suggestions, or feedback, please feel free to contact us.
            We're here to help and look forward to hearing from you.
          </p>
        </div>
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className=" rounded-pill form-control" id="name" placeholder="Your Name" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="rounded-pill form-control" id="email" placeholder="Your Email" />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="rounded-pill form-label">Message</label>
              <textarea className="form-control" id="message" rows="4" placeholder="Your Message"></textarea>
            </div>
            <button type="submit" className="rounded-pill btn btn-primary contact-us-submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}
