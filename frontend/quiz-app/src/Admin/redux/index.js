import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authRedux";
import { questionReducer } from "./questionRedux";
import { examReducer } from "./examsRedux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    QuestionSlice: questionReducer,
    exam: examReducer,
  },
});
