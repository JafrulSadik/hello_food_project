import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../requestMethod";

//create-new-order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await API.post("/order/newOrder", orderData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

//get-user-order-products
export const getOrderProducts = createAsyncThunk(
  "order/getOrderProducts",
  async (product, { rejectWithValue }) => {
    try {
      const res = await API.get("/order/allOrders", product);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    orderProducts: [],
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
        state.pending = false;
        state.cartProducts = action.payload;
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
      });
  },
});

export const {
  add_To_Cart,
  get_Cart_Products,
  decrease_Cart,
  increase_Cart,
  remove_From_Cart,
  get_Totals,
  add_buy_now_product,
  update_cart,
} = cartSlice.actions;

export default cartSlice.reducer;
