import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = {
  currentUser: null,
  isFetching: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => {},
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isFetching = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isFetching = false;
        state.error = null;
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message;
      });
  },
});

export const { clearError, logout } = userSlice.actions;

export default userSlice.reducer;

export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
  try {
    const res = await axios.post("/auth/login", user);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue({ error: err.message });
  }
});
