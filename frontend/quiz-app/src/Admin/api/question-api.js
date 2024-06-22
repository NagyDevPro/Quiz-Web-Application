import axios from "axios";

const baseURL = "http://localhost:8000/api"; // Assuming your API base URL

const questionsURL = `${baseURL}/questions`; // Endpoint for questions

const GetAllQuestions =  (examId) => axios.get(`http://localhost:8000/api/exams/${examId}`);
const AddQuestion = (question, exam_id) => {

    return axios.post(`http://localhost:8000/api/questions/${exam_id}`, question);
};
const DeleteQuestion = (id) => axios.delete(`${questionsURL}/${id}`);

export {
    GetAllQuestions,
    AddQuestion,
    DeleteQuestion,
};
