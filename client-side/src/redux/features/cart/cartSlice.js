import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProducts: [],
    buyNowProduct: {},
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
  },
  reducers: {
    get_Cart_Products: (state) => {
      const localProducts = JSON.parse(localStorage.getItem("cart"));
      state.cartProducts = localProducts ? localProducts : [];
    },
    add_To_Cart: (state, action) => {
      if (action.payload.quantity === 0) {
        toast.error("Product is out of stock");
      } else {
        const existingIndex = state?.cartProducts?.findIndex(
          (item) => item._id === action.payload._id
        );
        if (existingIndex >= 0) {
          toast.info("Product Already in the Cart");
        } else {
          state.cartProducts.push(action.payload);
          toast.success("Product added in the Cart");
          localStorage.setItem("cart", JSON.stringify(state.cartProducts));
        }
      }
    },
    decrease_Cart: (state, action) => {
      const itemIndex = state.cartProducts.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.cartProducts[itemIndex].cartQuantity > 1) {
        state.cartProducts[itemIndex].cartQuantity -= 1;
      } else {
        state.cartProducts[itemIndex].cartQuantity = 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.cartProducts));
    },
    increase_Cart: (state, action) => {
      const itemIndex = state.cartProducts.findIndex(
        (item) => item._id === action.payload._id
      );
      state.cartProducts[itemIndex].cartQuantity += 1;
      localStorage.setItem("cart", JSON.stringify(state.cartProducts));
    },
    remove_From_Cart: (state, action) => {
      const filteredCartProducts = state.cartProducts.filter(
        (item) => item._id !== action.payload._id
      );
      state.cartProducts = filteredCartProducts;
      localStorage.setItem("cart", JSON.stringify(state.cartProducts));
    },
    get_Totals: (state) => {
      let { total, quantity } = state.cartProducts.reduce(
        (cartTotal, cartItem) => {
          const { cartQuantity } = cartItem;
          const itemTotal = cartItem?.discount
            ? cartItem?.discount * cartQuantity
            : cartItem.price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    add_buy_now_product: (state, action) => {
      state.buyNowProduct = action.payload;
    },
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
} = cartSlice.actions;

export default cartSlice.reducer;
