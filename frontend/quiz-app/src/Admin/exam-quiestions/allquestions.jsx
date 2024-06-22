import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios'; // Import Axios for making HTTP requests
import { Link, useParams } from 'react-router-dom';
import { DeleteQuestion } from '../api/question-api';

function QuestionTable() {
    const { id } = useParams(); // Get examId from URL params
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/api/exams/${id}`);
                setQuestions(response.data.questions); // Assuming response.data contains an array of questions
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, [id]);

    if (isLoading) {
        return <h1>Loading...</h1>; // Show loading indicator
    }

    if (error) {
        return <h1>Error: {error}</h1>; // Show error message if fetching questions failed
    }

    if (!Array.isArray(questions) || questions.length === 0) {
        return <p>No questions found.</p>; // Handle cases where questions is not an array or empty
    }

    const deleteHandler = async (id) => {
        const response =   await  DeleteQuestion(id)
          console.log(response.data);
          const newList = questions.filter( questions => questions.id !== id )
          // eslint-disable-next-line no-undef
          setQuestions( [ ...newList ] )
      };

    return (
        <div className='mt-4 bg-light p-5 w-100'>
            <Link to={`/questionform/${id}`}>
                <button className='btn btn-primary p-1 m-1'>Add Question</button>
            </Link>
            <Table striped bordered hover size="lg">
                <thead>
                    <tr className='text-center'>
                        <th>Question</th>
                        <th>Mark</th>
                        <th>Choices</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question) => (
                        <tr key={question.id}>
                            <td>{question.question}</td>
                            <td>{question.mark}</td>
                            <td>
                                <ul>
                                    {/* Assuming question.choices is an array of choice objects */}
                                    {question.choices.map((choice) => (
                                        <li key={choice.id}>
                                            {choice.choice} ({choice.correctness === "correct" ? "Correct" : "Incorrect"})
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                               
                                <button onClick={() => deleteHandler(question.id)} className='btn btn-danger p-1 m-1'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default QuestionTable;
