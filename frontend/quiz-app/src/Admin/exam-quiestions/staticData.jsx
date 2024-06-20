import React from 'react';
import { Table } from 'react-bootstrap';

const staticData = [
    {
        id: 1,
        subject: 'Math',
        teacher_id: 101,
        availability: 'Available',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-10',
        questions: [
            {
                id: 1,
                question: 'What is 2+2?',
                mark: 5,
                choices: [
                    { id: 1, choice: '3', correctness: 'incorrect' },
                    { id: 2, choice: '4', correctness: 'correct' },
                    { id: 3, choice: '5', correctness: 'incorrect' },
                ],
            },
        ],
    },
    {
        id: 2,
        subject: 'Science',
        teacher_id: 102,
        availability: 'Unavailable',
        createdAt: '2023-02-01',
        updatedAt: '2023-02-10',
        questions: [
            {
                id: 2,
                question: 'What is H2O?',
                mark: 10,
                choices: [
                    { id: 1, choice: 'Water', correctness: 'correct' },
                    { id: 2, choice: 'Oxygen', correctness: 'incorrect' },
                    { id: 3, choice: 'Hydrogen', correctness: 'incorrect' },
                ],
            },
        ],
    },
    // Add more static data as needed
];

function StaticQuestionTable() {
    return (
        <div className='mt-4 bg-light p-5 w-100'>
            <Table striped bordered hover size="lg">
                <thead>
                    <tr className='text-center'>
                        <th>ID</th>
                        <th>Subject</th>
                        <th>Teacher ID</th>
                        <th>Availability</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Questions</th>
                    </tr>
                </thead>
                <tbody>
                    {staticData.map((item) => (
                        <tr className="text-center" key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.subject}</td>
                            <td>{item.teacher_id}</td>
                            <td>{item.availability}</td>
                            <td>{item.createdAt}</td>
                            <td>{item.updatedAt}</td>
                            <td>
                                {item.questions.map((question) => (
                                    <div key={question.id}>
                                        <p><strong>Question:</strong> {question.question}</p>
                                        <p><strong>Mark:</strong> {question.mark}</p>
                                        <ul>
                                            {question.choices.map((choice) => (
                                                <li key={choice.id}>
                                                    {choice.choice} ({choice.correctness})
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default StaticQuestionTable;
