import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authRedux";
import { examReducer } from "./examsRedux";

export const store = configureStore({
  reducer: {
    exam: examReducer, 
    auth: authReducer,
  },
});
