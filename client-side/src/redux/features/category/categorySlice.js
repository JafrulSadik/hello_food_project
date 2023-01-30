import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { API } from "../../../requestMethod";

//getAllCategories

export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (categories, { rejectWithValue }) => {
    try {
      const res = await API.get("/category", categories);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

// Create New Category

export const createCategroy = createAsyncThunk(
  "categories/createCategory",
  async ({ formData, navigate }, { rejectWithValue }) => {
    try {
      const res = await API.post("/category/create", formData);
      toast.success("Category Added Successfully");
      navigate("/admin/categories");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

// Update A Category

export const updateCategory = createAsyncThunk(
  "products/updateCategory",
  async ({ formData, navigate, categoryUrl }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/category/${categoryUrl}`, formData);
      toast.success("Category Updated Successfully");
      navigate("/admin/categories");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete A Category

export const deleteCategory = createAsyncThunk(
  "products/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      await API.delete(`/category/${categoryId}`);
      toast.success("Category Deleted Successfully");
      return categoryId;
    } catch (error) {
      console.log(error.response.data);
      toast.success("failed");
      return rejectWithValue(error.response.data);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    // Get All Category
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      // Create New Category
      .addCase(createCategroy.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategroy.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(createCategroy.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Update Category

      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Delete A Category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.categories.splice(
          state.categories.findIndex((item) => item._id === action.payload),
          1
        );
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default categorySlice.reducer;
