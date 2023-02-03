import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    non_User_Add_To_Cart: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      let cartProducts = [];
      cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
      cartProducts.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(cartProducts));
      state.total += action.payload.price * action.payload.quantity;
    },
    non_User_Get_Cart_Product: (state) => {
      const localProducts = JSON.parse(localStorage.getItem("cart")) ;
      state.products = localProducts ? localProducts : [];
    },
  },
});

export const { non_User_Add_To_Cart, non_User_Get_Cart_Product } =
  cartSlice.actions;

export default cartSlice.reducer;
