import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { GetQuestionById, UpdateQuestion } from '../api/question-api';

function UpdateQuestionForm() {
    const [formData, setFormData] = useState({
        mark: '', // Initialize mark here
        question: '',
        choices: [
            { choice: '', correctness: 'correct' },
            { choice: '', correctness: 'wrong' },
            { choice: '', correctness: 'wrong' }
        ],
    });

    const [exam_id, setExamId] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await GetQuestionById(id);
                console.log('Fetched question:', response.data);
                const { mark, question, choices, exam_id } = response.data;
                setFormData({ mark, question, choices });
                setExamId(exam_id.toString());
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching question:', error);
                setIsLoading(false);
            }
        };

        if (id) {
            fetchQuestion();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm(formData, exam_id);
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length === 0) {
            try {
                const updatedData = {};
    
                // Only include fields that have changed
                if (formData.mark !== '') {
                    updatedData.mark = parseInt(formData.mark); // Ensure mark is sent as a number
                }
                if (formData.question !== '') {
                    updatedData.question = formData.question;
                }
                if (formData.choices && formData.choices.length > 0) {
                    updatedData.choices = formData.choices;
                }
                if (exam_id !== '') {
                    updatedData.exam_id = parseInt(exam_id); // Ensure exam_id is sent as a number
                }
    
                await UpdateQuestion(id, updatedData);
                console.log('Question updated:', updatedData);
                navigate(`/list_all_exam_questions/${exam_id}`);
    
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    const serverErrors = error.response.data.errors;
                    console.error('Validation errors:', serverErrors);
                    setErrors(serverErrors);
                } else {
                    console.error('Error submitting question form:', error);
                }
            }
        }
    };
        const validateForm = (data, exam_id) => {
        let errors = {};

        if (!data.question.trim()) {
            errors.question = 'Question is required';
        }
        if (!data.choices || !Array.isArray(data.choices)) {
            errors.choices = 'Choices must be provided as an array';
        } else {
            data.choices.forEach((choice, index) => {
                if (!choice.choice.trim()) {
                    errors[`choice${index}`] = 'Choice is required';
                }
            });
        }
        if (!data.mark || isNaN(parseInt(data.mark))) {
            errors.mark = 'Mark must be a valid number';
        }
        if (!exam_id.trim()) {
            errors.exam_id = 'Exam ID is required';
        } else if (isNaN(exam_id)) {
            errors.exam_id = 'Exam ID must be a number';
        }
        return errors;
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    console.log('FormData:', formData);
    console.log('Exam ID:', exam_id);

    return (
        <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationFormik101">
                    <Form.Label>Mark</Form.Label>
                    <Form.Control
                        type="text"
                        name="mark"
                        value={formData.mark}
                        onChange={handleChange}
                        isInvalid={!!errors.mark}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.mark}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="8" controlId="validationFormik102">
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                        type="text"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        isInvalid={!!errors.question}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.question}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            {formData.choices && Array.isArray(formData.choices) && formData.choices.map((choice, index) => (
                <Row className="mb-3" key={index}>
                    <Form.Group as={Col} md="4" controlId={`validationFormik103_${index}`}>
                        <Form.Label>Choice {index + 1}</Form.Label>
                        <Form.Control
                            type="text"
                            name={`choices[${index}].choice`}
                            value={choice.choice}
                            onChange={handleChange}
                            isInvalid={!!errors[`choice${index}`]}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors[`choice${index}`]}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId={`validationFormik104_${index}`}>
                        <Form.Label>Correctness</Form.Label>
                        <Form.Select
                            name={`choices[${index}].correctness`}
                            value={choice.correctness}
                            onChange={handleChange}
                        >
                            <option value="correct">Correct</option>
                            <option value="wrong">Wrong</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
            ))}
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationFormik105">
                    <Form.Label>Exam ID</Form.Label>
                    <Form.Control
                        type="text"
                        name="exam_id"
                        value={exam_id}
                        onChange={handleChange}
                        isInvalid={!!errors.exam_id}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.exam_id}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button type="submit">Update Question</Button>
        </Form>
    );
}

export default UpdateQuestionForm;
