import React from 'react'
import './AboutUs.css'
export default function AboutUs() {
  return (
    <div className="about-us-container container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={"https://img.freepik.com/premium-vector/exam-logo-isolated-white-background_681420-5396.jpg"} alt="About Us" className="img-fluid about-us-image" />
        </div>
        <div className="col-md-6">
          <h2 className=' title'>About Us</h2>
          <p>
            Welcome to Quiz Web Application. We are dedicated to providing you with the best quiz
            experiences, focusing on dependability, customer service, and uniqueness. Our passion
            for quizzes drives us to turn hard work and inspiration into a booming online platform.
          </p>
          <p>
            We hope you enjoy our quizzes as much as we enjoy offering them to you. If you have any
            questions or comments, please don't hesitate to contact us.
          </p>
        </div>
      </div>
    </div>
  )
}
