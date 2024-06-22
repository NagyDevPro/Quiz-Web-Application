import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function ResultsComponent() {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:8000/api/results');
                setResults(response.data); // Assuming response.data is an array of results
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs once on mount

    if (isLoading) {
        return <h1>Loading...</h1>; // Show loading indicator
    }

    if (error) {
        return <h1>Error: {error}</h1>; // Show error message if fetching results failed
    }

    if (!Array.isArray(results) || results.length === 0) {
        return <p>No results found.</p>; // Handle cases where results is not an array or empty
    }

    console.log(results);

    return (
        <div className='mt-4 bg-light p-5 w-100'>
            <h2>Student Results</h2>
            <Table striped bordered hover size="lg">
                <thead>
                    <tr className='text-center'>
                        <th>Student ID</th>
                        <th>Exam ID</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result) => (
                        <tr key={result.id}>
                            <td>{result.student_id}</td>
                            <td>{result.exam_id}</td>
                            <td>{result.result}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ResultsComponent;
