import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { API } from "../../../requestMethod";

//add-to-cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, { rejectWithValue }) => {
    const productId = data?.product._id;
    const userId = data?.id;
    const { cartQuantity } = data;
    try {
      await API.patch("/cart/addToCart", { userId, productId, cartQuantity });
      toast.success("Product is added to Cart");
      // return { ...res.data, cartQuantity: cartProduct.cartQuantity };
      return data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

//get-cart-products
export const getCartProducts = createAsyncThunk(
  "cart/getCartProducts",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/cart/cartProduct/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

//remove from cart
export const removeProductFromCart = createAsyncThunk(
  "cart/removeProductFromCart",
  async (data, { rejectWithValue }) => {
    try {
      await API.patch(`/cart/removeFromCart`, data);
      toast.success("Product is removed from cart");
      return data.productId;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);
// Increase cart quantity
export const increaseCartQuantity = createAsyncThunk(
  "cart/increaseCartQuantity",
  async (data, { rejectWithValue }) => {
    try {
      await API.patch(`/cart/increageQuantity`, data);
      return data.productId;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);
// Decrease Cart Qauntity
export const decreaseCartQuantity = createAsyncThunk(
  "cart/decreaseCartQuantity",
  async (data, { rejectWithValue }) => {
    try {
      await API.patch(`/cart/decreaseQuantity`, data);
      return data.productId;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProducts: [],
    buyNowProduct: {},
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    get_Cart_Products: (state) => {
      const localProducts = JSON.parse(sessionStorage.getItem("cart"));
      state.cartProducts = localProducts ? localProducts : [];
    },
    add_To_Cart: (state, action) => {
      if (action.payload?.product?.quantity === 0) {
        toast.error("Product is out of stock");
      } else {
        const existingIndex = state?.cartProducts?.findIndex(
          (item) => item.product._id === action.payload?.product?._id
        );
        if (existingIndex >= 0) {
          toast.info("Product Already in the Cart");
        } else {
          state.cartProducts.push(action.payload);
          toast.success("Product is added to Cart");
          sessionStorage.setItem("cart", JSON.stringify(state.cartProducts));
        }
      }
    },
    decrease_Cart: (state, action) => {
      const itemIndex = state.cartProducts.findIndex(
        (item) => item.product._id === action.payload._id
      );
      if (state.cartProducts[itemIndex].cartQuantity > 1) {
        state.cartProducts[itemIndex].cartQuantity -= 1;
      } else {
        state.cartProducts[itemIndex].cartQuantity = 1;
      }
      sessionStorage.setItem("cart", JSON.stringify(state.cartProducts));
    },
    increase_Cart: (state, action) => {
      const itemIndex = state.cartProducts.findIndex(
        (item) => item.product._id === action.payload._id
      );
      state.cartProducts[itemIndex].cartQuantity += 1;
      sessionStorage.setItem("cart", JSON.stringify(state.cartProducts));
    },
    remove_From_Cart: (state, action) => {
      const filteredCartProducts = state.cartProducts.filter(
        (item) => item.product._id !== action.payload._id
      );
      state.cartProducts = filteredCartProducts;
      toast.success("Product is added to Cart");
      sessionStorage.setItem("cart", JSON.stringify(state.cartProducts));
    },
    get_Totals: (state) => {
      let { total, quantity } = state.cartProducts.reduce(
        (cartTotal, cartItem) => {
          const { cartQuantity } = cartItem;
          const itemTotal = cartItem?.product.discount
            ? cartItem?.product.discount * cartQuantity
            : cartItem.product.price * cartQuantity;

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
    update_cart: (state, action) => {
      state.cartProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    //add to cart
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const { product, cartQuantity } = action.payload;
        state.pending = false;
        toast.success(action.payload);
        state.cartProducts.push({ product, cartQuantity });
        state.error = false;
      })
      .addCase(addToCart.rejected, (state) => {
        state.error = true;
        toast.error("Product already in the cart");
        state.loading = false;
      })
      //get cart products
      .addCase(getCartProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartProducts.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.products) {
          state.cartProducts = action.payload?.products;
        } else {
          state.cartProducts = action.payload;
        }

        state.error = false;
      })
      .addCase(getCartProducts.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      // remove product from cart
      .addCase(removeProductFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.loading = false;
        const filteredCartProducts = state.cartProducts.filter(
          (item) => item.product._id !== action.payload
        );
        state.cartProducts = filteredCartProducts;
        state.error = false;
      })
      .addCase(removeProductFromCart.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      //Increase Cart Quantity
      .addCase(increaseCartQuantity.pending, (state) => {
        state.loading = false;
      })
      .addCase(increaseCartQuantity.fulfilled, (state, action) => {
        state.loading = false;

        const itemIndex = state.cartProducts.findIndex(
          (item) => item.product._id === action.payload
        );
        state.cartProducts[itemIndex].cartQuantity += 1;
        state.error = false;
      })
      .addCase(increaseCartQuantity.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      // Decrease Cart Quantity
      .addCase(decreaseCartQuantity.pending, (state) => {
        state.loading = false;
      })
      .addCase(decreaseCartQuantity.fulfilled, (state, action) => {
        state.loading = false;

        const itemIndex = state.cartProducts.findIndex(
          (item) => item.product._id === action.payload
        );
        if (state.cartProducts[itemIndex].cartQuantity > 1) {
          state.cartProducts[itemIndex].cartQuantity -= 1;
        } else {
          state.cartProducts[itemIndex].cartQuantity = 1;
        }
        state.error = false;
      })
      .addCase(decreaseCartQuantity.rejected, (state) => {
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
