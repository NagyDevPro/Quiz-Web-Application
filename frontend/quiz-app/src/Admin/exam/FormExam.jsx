import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addExam } from "../redux/examsRedux";
import { useDispatch } from "react-redux";

function FormExam() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    subject: "",
    teacher_id: 25,
    availablity: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        console.log("Adding new exam:", formData);
        dispatch(addExam(formData)).then(() => {
          navigate("/exams");
        });
      } catch (error) {
        console.error("Error submitting exam form:", error);
      }
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.subject.trim()) {
      errors.subject = "Subject is required";
    }
    if (!data.availablity) {
      errors.availablity = "availablity is required";
    }
    return errors;
  };

  return (
    <div className="container">
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationFormik101">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              isInvalid={!!errors.subject}
            />
            <Form.Control.Feedback type="invalid">
              {errors.subject}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationFormik102">
            <Form.Label>availablity</Form.Label>
            <Form.Control
              as="select"
              name="availablity"
              value={formData.availablity}
              onChange={handleChange}
              isInvalid={!!errors.availablity}
            >
              <option value="" disabled>
                Choose...
              </option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.availablity}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Submit Exam</Button>
      </Form>
    </div>
  );
}

export default FormExam;
