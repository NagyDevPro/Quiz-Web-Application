import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { showExamById } from '../Admin/redux/examsRedux';
import "./assets/StudentExamQuestions.css";

export default function StudentExamQuestions() {
  const { examId } = useParams();
  const dispatch = useDispatch();
  const exam = useSelector(state => state.exam.exam);
  const isLoading = useSelector(state => state.exam.isLoading);
  const error = useSelector(state => state.exam.error);
  const [selectedChoices, setSelectedChoices] = useState({});

  useEffect(() => {
    dispatch(showExamById(examId));
  }, [dispatch, examId]);

  const handleChoiceClick = (questionId, choiceId) => {
    setSelectedChoices(prevState => ({
      ...prevState,
      [questionId]: choiceId
    }));
  };

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
    <div className="exam-questions-container">
      {exam?.questions.map(question => (
        <div key={question.id} className="question-item">
          <h2>{question.question}</h2>
          <div className="choices-list">
            {question.choices.map(choice => (
              <div
                key={choice.id}
                className={`choice-item ${selectedChoices[question.id] === choice.id ? 'active' : ''}`}
                onClick={() => handleChoiceClick(question.id, choice.id)}
              >
                {choice.choice}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className="submit-button">Submit</button>
    </div>
  );
}
