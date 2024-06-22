import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api";
const examsUrl = `${baseURL}/exams`;
const specificExamUrl = (id) => `${baseURL}/exams/${id}`;

const createExam = (examData, token) =>
  axios.post(examsUrl, examData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const editExam = (id, examData) =>
  axios.put(specificExamUrl(id), examData);

const deleteExam = (id, token) =>
  axios.delete(specificExamUrl(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


// Note You Should Put Token Here If you want to test the component 
//comment the header section   
const showAllExams = (token) =>
  axios.get(examsUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


    
const showSpecificExam = (id, token) =>
  axios.get(specificExamUrl(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export { createExam, editExam, deleteExam, showAllExams, showSpecificExam };
