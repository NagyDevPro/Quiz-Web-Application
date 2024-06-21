import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
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
import StaticQuestionTable from "./Admin/exam-quiestions/staticData";
import QuestionForm from "./Admin/exam-quiestions/addUpdateQuestion";

function App() {
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
          <Route path="/list_all_exam_questions" element={<QuestionTable />} />
          <Route path="/questionform" element={<QuestionForm />} />
          <Route path="/questionform-update/:id" element={<QuestionForm />} />
          <Route path="/static" element={<StaticQuestionTable />} />
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
