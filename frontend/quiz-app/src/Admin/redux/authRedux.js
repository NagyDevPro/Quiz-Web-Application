import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:8000/api";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/login`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/logout`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    name: null,
    isAuthenticated: false,
    role: null,
    token: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("Registed Successfully")
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
          console.log("success");
        state.name = action.payload.name;
        state.isAuthenticated = true;
        state.role = action.payload.role;
        state.token = action.payload.access_token;
        localStorage.setItem("token", action.payload.access_token);
        localStorage.setItem("role", action.payload.role);
        localStorage.setItem("name", action.payload.name);
        localStorage.setItem("user_id", action.payload.user_id);
      })
      .addCase(loginUser.rejected, (state, action) => {
          console.log("not success");
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.name = null;
        state.isAuthenticated = false;
        state.role = null;
        state.token = null;
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("user_id");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
