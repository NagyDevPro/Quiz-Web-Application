import { configureStore } from "@reduxjs/toolkit";
import { questionReducer } from "./questionRedux";
import { examReducer } from "./examsRedux";

export const store = configureStore({
  reducer: {
    QuestionSlice: questionReducer,
    exam: examReducer, 
  },
});
