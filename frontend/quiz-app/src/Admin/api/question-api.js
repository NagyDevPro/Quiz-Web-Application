import axios from "axios";

const baseURL = "http://localhost:8000/api"; // Assuming your API base URL

const questionsURL = `${baseURL}/questions`; // Endpoint for questions

const GetAllQuestions =  (examId) => axios.get(`http://localhost:8000/api/exams/${examId}`);
const AddQuestion = (question, exam_id) => {

    return axios.post(`${questionsURL}/${exam_id}`, question);
};
const GetQuestionById = (id) => axios.get(`${questionsURL}/${id}`);
const UpdateQuestion = async (id, updatedData) => {
    try {
        const response = await axios.put(`http://localhost:8000/api/questions/${id}`, updatedData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
const DeleteQuestion = (id) => axios.delete(`${questionsURL}/${id}`);

export {
    GetAllQuestions,
    AddQuestion,

    UpdateQuestion,
    DeleteQuestion,
    GetQuestionById

};
