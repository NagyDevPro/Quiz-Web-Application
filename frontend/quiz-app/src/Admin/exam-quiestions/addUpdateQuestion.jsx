import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { AddQuestion } from '../api/question-api';

function QuestionForm({ initialData }) {
    const [formData, setFormData] = useState(initialData || {
        mark: '',
        question: '',
        choices: [
            { choice: '', correctness: 'correct' },
            { choice: '', correctness: 'wrong' },
            { choice: '', correctness: 'wrong' }
        ],
    });
    const [exam_id, setExamId] = useState(''); // State for exam ID input
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setFormData({
            mark: '',
            question: '',
            choices: [
                { choice: '', correctness: 'correct' },
                { choice: '', correctness: 'wrong' },
                { choice: '', correctness: 'wrong' }
            ],
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'mark' || name === 'question') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        } else if (name.startsWith('choice')) {
            const index = parseInt(name.substring(6)); // Extract the index from 'choiceX'
            const updatedChoices = [...formData.choices];
            updatedChoices[index] = {
                ...updatedChoices[index],
                choice: value
            };
            setFormData((prevData) => ({
                ...prevData,
                choices: updatedChoices
            }));
        } else if (name === 'exam_id') {
            setExamId(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm(formData);
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length === 0) {
            try {
                if (!exam_id) {
                    throw new Error("Exam ID is required");
                }

                // Assign examId to formData
                formData.exam_id = exam_id;

                console.log('Adding new question:', formData);
                await AddQuestion(formData, exam_id); // Pass examId as a separate parameter
            
                // Navigate to the appropriate route after submission
                navigate(`/list_all_exam_questions/${exam_id}`);
                
            } catch (error) {
                console.error('Error submitting question form:', error);
            }
        }
    };

    const validateForm = (data) => {
        let errors = {};
        if (!data.mark.trim()) {
            errors.mark = 'Mark is required';
        } else if (isNaN(data.mark)) {
            errors.mark = 'Mark must be a number';
        }
        if (!data.question.trim()) {
            errors.question = 'Question is required';
        }
        data.choices.forEach((choice, index) => {
            if (!choice.choice.trim()) {
                errors[`choice${index}`] = 'Choice is required';
            }
        });
        if (!exam_id.trim()) {
            errors.exam_id = 'Exam ID is required';
        } else if (isNaN(exam_id)) {
            errors.exam_id = 'Exam ID must be a number';
        }
        return errors;
    };

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
            <Row className="mb-3">
                {formData.choices.map((choice, index) => (
                    <React.Fragment key={index}>
                        <Form.Group as={Col} md="4" controlId={`validationFormik103_${index}`}>
                            <Form.Label>Choice {index + 1}</Form.Label>
                            <Form.Control
                                type="text"
                                name={`choice${index}`}
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
                                name={`correctness${index}`}
                                value={choice.correctness}
                                onChange={handleChange}
                            >
                                <option value="correct">Correct</option>
                                <option value="wrong">Wrong</option>
                            </Form.Select>
                        </Form.Group>
                    </React.Fragment>
                ))}
            </Row>
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
            <Button type="submit">Submit Question</Button>
        </Form>
    );
}

export default QuestionForm;
