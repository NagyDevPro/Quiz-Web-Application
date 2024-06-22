import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams,destroyExam } from "../redux/examsRedux";
import { Link } from "react-router-dom";

function ExamTable() {
  const { exams, isLoading, error } = useSelector((state) => state.exam);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllExams());
  }, [dispatch]);

  const deleteHandler = (examId) => {
    dispatch(destroyExam(examId));
  };

  return (
    <div className="mt-4 p-5 w-100">
      {isLoading && (
        <h1 className="alert alert-success text-dark">Loading...</h1>
      )}
      {error ? (
        <h1 className="alert alert-danger">Error: {error}</h1>
      ) : (
        <div>
          <Link to="/add-exam">
            <button className="btn btn-primary p-1 m-1">Add Exam</button>
          </Link>

                    <Table striped bordered hover size="lg">
                        <thead>
                            <tr className='text-center'>
                                <th>Subject</th>
                                <th>Teacher</th>
                                <th>Availability</th> {/* Corrected typo */}
                                <th>Actions</th> {/* Added Actions column */}
                            </tr>
                        </thead>
                        <tbody>
                            {exams.map((exam) => (
                                <tr key={exam.subject}>
                                    <td>{exam.subject}</td> {/* Corrected mapping */}
                                    <td>{exam.teacher_id}</td>
                                    <td>{exam.availability}</td> {/* Corrected typo */}
                                    <td>
                                        <Link to={`/update-exam/${exam.id}`}> {/* Added valid route */}
                                            <button className='btn btn-success p-1 m-1'>Update</button>
                                        </Link>
                                        <button className='btn btn-danger p-1 m-1'  onClick={() => deleteHandler(exam.id)} >Delete</button>
                                        <Link to={`/list_all_exam_questions/${exam.id}`} className='btn btn-dark text-light p-1 m-1'>
                                        Show Questions
                                        </Link>

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

export default ExamTable;
