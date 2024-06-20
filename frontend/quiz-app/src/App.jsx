import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import "./App.css";
import QuestionTable from "./Admin/exam-quiestions/allquestions";
import NavBar from "./Template/NavBar";
import { NotFound } from "./Template/NotFound";
import StaticQuestionTable from "./Admin/exam-quiestions/staticData";
import QuestionForm from "./Admin/exam-quiestions/addUpdateQuestion";

function App() {
    return (
        <Router>
            <NavBar /> {/* Render NavBar outside Routes */}
            <Routes>
                <Route path="/list_all_exam_questions" element={<QuestionTable />} />
                <Route path="/questionform" element={<QuestionForm />} />
                <Route path="/questionform-update/:id" element={<QuestionForm />} />
                <Route path="/static" element={<StaticQuestionTable />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
