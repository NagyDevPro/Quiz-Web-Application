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
          <Route path="/questionform-update/:id" element={<AddQuestionForm />} />
          <Route path="exams" element={<ShowAllExams />} />

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
