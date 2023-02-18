import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { API } from "../../../requestMethod";

// Get All Products
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (products, { rejectWithValue }) => {
    try {
      const response = await API.get("/product", products);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get A Single Product
export const getSingleProduct = createAsyncThunk(
  "product/getSingleProduct",
  async (productUrl, { rejectWithValue }) => {
    try {
      const response = await API.get(`/product/${productUrl}`, productUrl);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create New Product
export const createNewProduct = createAsyncThunk(
  "products/createNewProduct",
  async ({ formData, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post("/product/add_product", formData);
      toast.success("Product Added Successfully");
      navigate("/admin/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Product

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ formData, navigate, _id }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/product/${_id}`, formData);
      toast.success("Product Updated Successfully");
      navigate("/admin/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await API.delete(`/product/${productId}`);
      toast.success("Product Deleted Successfully");
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    products: [],
    error: false,
    loading: false,
    success: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    //Get All Products
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.success = true;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      //Create New Product
      .addCase(createNewProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewProduct.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        // state.products.push(action.payload);
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      //Get Single Product
      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.error = false;
      })
      .addCase(getSingleProduct.rejected, (state) => {
        state.error = true;
        state.pending = false;
      })
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      //Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.products.splice(
          state.products.findIndex((item) => item._id === action.payload),
          1
        );
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
