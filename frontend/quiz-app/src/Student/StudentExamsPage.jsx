import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllExams } from '../Admin/redux/examsRedux';
import "./assets/StudentExamPage.css";
import { useNavigate } from 'react-router-dom';

export default function StudentExamsPage() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const exams = useSelector(state => state.exam.exams);
  const isLoading = useSelector(state => state.exam.isLoading);
  const error = useSelector(state => state.exam.error);
  const user = localStorage.getItem("name");
 
 const handleExamClick = (id) => {
    navigate(`/student-exam/${id}`);
  };

  useEffect(() => {
    dispatch(getAllExams());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary fs-3 bigger-spinner" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }
  if (error) return <div className="error-message">Error: {error}</div>;
   
  return (
    <div className="exams-container">
      <h1>Welcome Back, {user} </h1>
    <p>Pick an exam to get started.</p>
      <div className="exams-list">
        {exams.map((exam, index) => (
          exam.availablity === 'available' && (
            <div key={exam.id} className="exam-item"  onClick={() => handleExamClick(exam.id)}>
              <span className="exam-icon "><i className="bi bi-code"></i> </span>
              <span className="exam-name">{exam.subject}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
