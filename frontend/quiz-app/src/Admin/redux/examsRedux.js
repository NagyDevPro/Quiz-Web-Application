import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showAllExams } from "../api/exams-api";

const initialState = {
  exams: [],
  isLoading: false,
  error: null,
};

export const getAllExams = createAsyncThunk(
  "exam/getAllExams",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await showAllExams();
      console.log("API Response:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching exams:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

const ExamSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllExams.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllExams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exams = action.payload; 
      })
      .addCase(getAllExams.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const examReducer = ExamSlice.reducer;
export const examActions = ExamSlice.actions;
