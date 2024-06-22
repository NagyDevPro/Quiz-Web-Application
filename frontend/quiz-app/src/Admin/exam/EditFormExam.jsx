import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { updateExam, showExamById } from "../redux/examsRedux";
import { useDispatch, useSelector } from "react-redux";

function FormExam() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { exam, isLoading, error } = useSelector((state) => state.exam);

  const [formData, setFormData] = useState({
    subject: "",
    teacher_id: "", 
    availablity: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      dispatch(showExamById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    console.log("Exam data:", exam);

    if (exam) {
      setFormData({
        subject: exam.subject || "",
        teacher_id: 25, 
        availablity: exam.availablity || "",
      });
    }
  }, [exam]);

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
        console.log("Updating exam:", formData);
        dispatch(updateExam({ formData, id }));
        navigate("/exams");
      } catch (error) {
        console.error("Error updating exam:", error);
      }
    }
  };
  

  const validateForm = (data) => {
    let errors = {};
    if (!data.subject.trim()) {
      errors.subject = "Subject is required";
    }
    if (!data.availablity) {
      errors.availablity = "Availability is required";
    }
    return errors;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
            <Form.Label>Availability</Form.Label>
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
        <Button type="submit">Update Exam</Button>
      </Form>
    </div>
  );
}

export default FormExam;
