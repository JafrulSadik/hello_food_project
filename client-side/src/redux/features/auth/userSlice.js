import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { API } from "../../../requestMethod";

// Get All Users

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

// Delete A User

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await API.delete(`/user/${userId}`);
      toast.success("User Deleted Successfully");
      return userId;
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
    //Get All Users
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
      })
      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.pending = false;
        state.users.splice(
          state.users.findIndex((item) => item._id === action.payload),
          1
        );
      })
      .addCase(deleteUser.rejected, (state) => {
        state.error = true;
      });
  },
});

export default userSlice.reducer;
