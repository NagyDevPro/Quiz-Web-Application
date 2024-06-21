import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAllQuestions, AddQuestion, UpdateQuestion } from "../api/question-api";

const initialState = {
    questions: [],
    isLoading: false,
    error: null,
};

export const addQuestion = createAsyncThunk(
    "question/addQuestion",
    async (question, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const res = await AddQuestion(question);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const editQuestion = createAsyncThunk(
    "question/editQuestion",
    async ({ question, id }, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const res = await UpdateQuestion(question, id);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getAllQuestions = createAsyncThunk(
    "question/getAllQuestions",
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const res = await GetAllQuestions();
            console.log("API Response:", res.data); // Log the response for debugging
            return res.data;
        } catch (error) {
            console.error("Error fetching questions:", error.message);
            return rejectWithValue(error.message);
        }
    }
);




const QuestionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllQuestions.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getAllQuestions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.questions = action.payload.questions; // Store only the questions array
        })
        .addCase(getAllQuestions.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(addQuestion.fulfilled, (state, action) => {
                state.questions.push(action.payload);
                state.isLoading = false;
            })
            .addCase(editQuestion.fulfilled, (state, action) => {
                const updatedQuestion = action.payload;
                state.questions = state.questions.map((question) =>
                    question.id === updatedQuestion.id ? updatedQuestion : question
                );
                state.isLoading = false;
            });
    },
});

export const questionReducer = QuestionSlice.reducer;
export const questionActions = QuestionSlice.actions;
