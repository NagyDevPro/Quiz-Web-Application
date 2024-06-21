import { configureStore } from "@reduxjs/toolkit";
import { questionReducer } from "./questionRedux";

export const store = configureStore({
    reducer: {
        QuestionSlice: questionReducer,
    },
});
