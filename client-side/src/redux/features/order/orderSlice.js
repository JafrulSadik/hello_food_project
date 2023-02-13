import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../requestMethod";

//create-new-order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderProduct, { rejectWithValue }) => {
    try {
      const res = await API.post("/order", orderProduct);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

//get-user-order-products
export const getOrderProducts = createAsyncThunk(
  "order/getOrderProducts",
  async ({ rejectWithValue }) => {
    try {
      const res = API.get("order");
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
    buyNowProduct: {},
    orderTotalQuantity: 0,
    orderTotalAmount: 0,
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
      //get ordre products
      .addCase(getOrderProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderProducts.fulfilled, (state, action) => {
        state.pending = false;
        state.cartProducts = action.payload;
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
