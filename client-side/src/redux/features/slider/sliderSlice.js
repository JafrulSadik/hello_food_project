import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { API } from "../../../requestMethod";

export const createSlider = createAsyncThunk(
  "categories/createCategory",
  async ({ formData, navigate }, { rejectWithValue }) => {
    try {
      const res = await API.post("/slider/create", formData);
      toast.success("Slider Added Successfully");
      navigate("/admin/sliders");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

export const getAllSliders = createAsyncThunk(
  "categories/getAllSliders",
  async (sliderData, { rejectWithValue }) => {
    try {
      const res = await API.get("/slider", sliderData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

// Delete Slider

export const deleteSlider = createAsyncThunk(
  "categories/deleteSlider",
  async (sliderId, { rejectWithValue }) => {
    try {
      await API.delete(`/slider/${sliderId}`);
      toast.success("Slider Deleted Successfully");
      return sliderId;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

export const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    sliders: [],
    loading: false,
    error: null,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    // Create New Slider
    builder
      .addCase(createSlider.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSlider.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createSlider.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      // Get All Sliders
      .addCase(getAllSliders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSliders.fulfilled, (state, action) => {
        state.loading = false;
        state.sliders = action.payload;
      })
      .addCase(getAllSliders.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      //Delete Slider
      .addCase(deleteSlider.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSlider.fulfilled, (state, action) => {
        state.loading = false;
        state.sliders.splice(
          state.sliders.findIndex((item) => item._id === action.payload),
          1
        );
      })
      .addCase(deleteSlider.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default sliderSlice.reducer;
