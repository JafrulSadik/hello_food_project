import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { API } from "../../../requestMethod";

// For Register

export const createUser = createAsyncThunk(
  "users/create",
  async (user, { rejectWithValue }) => {
    try {
      const response = await API.post("/signup", user);
      toast.success("Account successfully created");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// For Login

export const loginUser = createAsyncThunk(
  "users/login",
  async (user, { rejectWithValue }) => {
    try {
      const res = await API.post("/login", user);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// For Logout

export const logout = createAsyncThunk("users/logout", async (navigate) => {
  const res = await API.get("/logout");
  toast.success("Logout successfully");
  navigate("/");
  return res.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: null,
    pending: null,
    success: false,
    error: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Register a user
    builder
      .addCase(createUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.userInfo = action.payload;
        state.pending = false;
        state.success = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload;
      })
      // Login a user
      .addCase(loginUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        sessionStorage.removeItem("cart");
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.userInfo = action.payload;
        state.pending = false;
        state.success = true;
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.pending = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.pending = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.userInfo = null;
        state.success = true;
        state.pending = false;
        localStorage.removeItem("profile");
      })
      .addCase(logout.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload;
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
