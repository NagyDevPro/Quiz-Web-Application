import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  showAllExams,
  deleteExam,
  createExam,
  editExam,
  showSpecificExam,
} from "../api/exams-api";

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
export const showExamById = createAsyncThunk(
  "exam/showExamById",
  async (examId, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await showSpecificExam(examId);
      return res.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.message);
    }
  }
);

export const destroyExam = createAsyncThunk(
  "exam/deleteExam",
  async (examId, thunkApi) => {
    try {
      await deleteExam(examId);
      return examId;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);


export const addExam = createAsyncThunk(
  "exam/addExam",
  async (exam, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await createExam(exam);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateExam = createAsyncThunk(
  "exam/editExam",
  async ({ exam, id }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await editExam(exam, id);
      return res.data;
    } catch (error) {
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
      })
      .addCase(destroyExam.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(destroyExam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exams = state.exams.filter((exam) => exam.id !== action.payload);
      })
      .addCase(destroyExam.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateExam.fulfilled, (state, action) => {
        const updatedExam = action.payload;
        state.exams = state.exams.map((exam) =>
          exam.id === updatedExam.id ? updatedExam : exam
        );
        state.isLoading = false;
      })
      .addCase(showExamById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(showExamById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exam = action.payload;
      })
      .addCase(showExamById.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.error = action.payload;
      });
  },
});

export const examReducer = ExamSlice.reducer;
export const examActions = ExamSlice.actions ;
