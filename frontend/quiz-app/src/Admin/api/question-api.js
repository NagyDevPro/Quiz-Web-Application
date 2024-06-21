import axios from "axios";

const baseURL = "http://localhost:8000/api"; // Assuming your API base URL

const questionsURL = `${baseURL}/questions`; // Endpoint for questions
const examsURL = `${baseURL}/exams`; // Endpoint for exams
const examId = 5; // Static exam ID for all operations

const GetAllQuestions = () => axios.get(`${examsURL}/${examId}`);
const AddQuestion = (question) => axios.post(`${questionsURL}/${examId}`, question);
const UpdateQuestion = (question, id) => axios.post(`${questionsURL}/${id}`, question);
const DeleteQuestion = (id) => axios.delete(`${questionsURL}/${id}`);
const GetQuestionById = (id) => axios.get(`${questionsURL}/${id}`);

export {
    GetAllQuestions,
    AddQuestion,
    UpdateQuestion,
    DeleteQuestion,
    GetQuestionById
};
