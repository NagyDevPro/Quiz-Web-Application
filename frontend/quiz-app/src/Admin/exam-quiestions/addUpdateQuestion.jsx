import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { AddQuestion, UpdateQuestion, GetQuestionById } from '../api/question-api';

function QuestionForm() {
    const [formData, setFormData] = useState({
        mark: '',
        question: '',
        choices: [
            { choice: '', correctness: 'correct' },
            { choice: '', correctness: 'wrong' },
            { choice: '', correctness: 'wrong' }
        ]
    });
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchQuestion = async () => {
                try {
                    console.log(`Fetching question with ID: ${id}`);
                    const response = await GetQuestionById(id);
                    console.log('Question data:', response.data);
                    setFormData(response.data);
                } catch (error) {
                    console.error('Error fetching question data:', error);
                }
            };
            fetchQuestion();
        } else {
            setFormData({
                mark: '',
                question: '',
                choices: [
                    { choice: '', correctness: 'correct' },
                    { choice: '', correctness: 'wrong' },
                    { choice: '', correctness: 'wrong' }
                ]
            });
        }
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
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                if (!id) {
                    console.log('Adding new question:', formData);
                    await AddQuestion(formData);
                } else {
                    console.log(`Updating question with ID: ${id}`, formData);
                    await UpdateQuestion(formData, id);
                }

                navigate('/list_all_exam_questions');
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
            <Button type="submit">Submit Question</Button>
        </Form>
    );
}

export default QuestionForm;
