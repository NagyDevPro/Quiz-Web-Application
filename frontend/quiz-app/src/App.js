import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useParams,
} from "react-router-dom";

import HomePage from "./Student/HomePage";
import NotFound from "./Template/NotFound";
import IndexPage from "./Template/IndexPage";
import AboutUs from "./Template/AboutUs";
import ContactUs from "./Template/ContactUs";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ShowAllExams from "./Admin/exam/showAllExams";
import QuestionTable from "./Admin/exam-quiestions/allquestions";
import AddQuestionForm from "./Admin/exam-quiestions/addUpdateQuestion";
import QuestionForm from "./Admin/exam-quiestions/addUpdateQuestion";
import FormExam from "./Admin/exam/FormExam";
import EditFormExam from "./Admin/exam/EditFormExam";
import { ProtectedRoute, PublicRoute } from "./Guards/ProtectedRoute";
import StudentExamsPage from "./Student/StudentExamsPage";
import StudentExamQuestions from "./Student/StudentExamQuestions";
import StudentExamResult from "./Student/StudentExamResult";
import ResultsComponent from "./Admin/results/students-results-exams";
import UpdateQuestionForm from "./Admin/exam-quiestions/updateQuestion";

function App() {
  const { id } = useParams(); 

  //general routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<IndexPage />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/list_all_exam_questions/:id" element={<QuestionTable />} />
          <Route path="/list_all_exam_questions" element={<QuestionTable />} />
          <Route path="/questionform/:id" element={<AddQuestionForm examId={id} />} />
          <Route path="/questionform-update/:id" element={<UpdateQuestionForm />} />
          <Route path="/allStudentResults" element={<ResultsComponent />} />
          <Route path="exams" element={<ShowAllExams />} />

          <Route element={<PublicRoute />}>
            <Route path="about" element={<AboutUs />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* studentRoute */}
          <Route element={<ProtectedRoute />}>
            <Route to="student-exams" element={<StudentExamsPage/>}/>
            <Route to="student-exam/:id" element={<StudentExamQuestions/>} />
            <Route to="student-result" element={<StudentExamResult/>}/>

          </Route>

          {/* admin section */}
          <Route element={<ProtectedRoute admin={true} />}>
            <Route
              path="/list_all_exam_questions"
              element={<QuestionTable />}
            />
             <Route path="/allStudentResults" element={<ResultsComponent />} />
            <Route path="/questionform/:id" element={<AddQuestionForm examId={id} />} />
            <Route path="/questionform-update/:id" element={<UpdateQuestionForm />} />
            <Route path="exams" element={<ShowAllExams />} />
            <Route path="/add-exam" element={<FormExam />} />
            <Route path="/update-exam/:id" element={<EditFormExam />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
