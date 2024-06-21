import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuestions } from '../redux/questionRedux';
import { Link } from 'react-router-dom';

function QuestionTable() {
    const { questions, isLoading, error } = useSelector(state => state.QuestionSlice); // Adjust the state slice name if necessary
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllQuestions());
    }, [dispatch]);

    return (
        <div className='mt-4 bg-light p-5 w-100'>
            {isLoading && <h1 className='alert alert-success text-dark'>Loading...</h1>}
            {error ? (
                <h1 className='alert alert-danger'>Error: {error}</h1>
            ) : (
                <div>
                    <Link to={'/questionform'}>
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
                                        {question.choices.map((choice) => (
                                            <li key={choice.id}>
                                                {choice.choice} ({choice.correctness})
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <Link to={`/questionform-update/${question.id}`}>
                                    <button className='btn btn-success p-1 m-1'>Update</button>
                                    </Link>
                                    <button className='btn btn-danger p-1 m-1'>delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </div>
            )}
        </div>
    );
}

export default QuestionTable;
