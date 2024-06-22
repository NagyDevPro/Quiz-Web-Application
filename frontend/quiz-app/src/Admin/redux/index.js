import { configureStore } from "@reduxjs/toolkit";
import { examReducer } from "./examsRedux";

export const store = configureStore({
  reducer: {
    exam: examReducer, 
  },
});
