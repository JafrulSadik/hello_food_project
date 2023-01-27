import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../requestMethod";

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (user, { rejectWithValue }) => {
    try {
      const response = await API.get("/user/allUsers", user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    pending: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.pending = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
