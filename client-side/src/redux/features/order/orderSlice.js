import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { API } from "../../../requestMethod";

//create-new-order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await API.post("/order/newOrder", orderData);
      toast.success("Order Placed Successfully");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

//get-all-order
export const getOrderProducts = createAsyncThunk(
  "order/getOrderProducts",
  async (product, { rejectWithValue }) => {
    try {
      const res = await API.get("/order/allOrders", product);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (data, { rejectWithValue }) => {
    try {
      const { orderId, navigate, ...others } = data;
      const res = await API.patch(`/order/${orderId}`, others);
      navigate("/admin/orders");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);
// Get Single Oder
export const getOrderByUser = createAsyncThunk(
  "order/getOrderByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/order/${userId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderProducts: [],
    orderId: "",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //create new order
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderId = action.payload;
        state.error = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      //get order products
      .addCase(getOrderProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.orderProducts = action.payload;
        state.error = false;
      })
      .addCase(getOrderProducts.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      //get Order by User
      .addCase(getOrderByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.orderProducts = action.payload;
        state.error = false;
      })
      .addCase(getOrderByUser.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      //Update Order
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state) => {
        state.loading = false;
        toast.success("Order is Updated Successfully");
        state.error = false;
      })
      .addCase(updateOrder.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default orderSlice.reducer;
