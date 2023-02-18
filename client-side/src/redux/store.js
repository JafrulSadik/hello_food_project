import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import userSlice from "./features/auth/userSlice";
import cartSlice from "./features/cart/cartSlice";
import categorySlice from "./features/category/categorySlice";
import orderSlice from "./features/order/orderSlice";
import productSlice from "./features/product/productSlice";
import sliderSlice from "./features/slider/sliderSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  product: productSlice,
  category: categorySlice,
  slider: sliderSlice,
  cart: cartSlice,
  order: orderSlice,
});

// For Hiding dev tools
// {devTools: false}

export default configureStore({ reducer: rootReducer }, { devTools: false });

// For persistor

// import {
//   FLUSH,
//   PAUSE,
//   PERSIST,
//   persistReducer,
//   persistStore,
//   PURGE,
//   REGISTER,
//   REHYDRATE,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, cartSlice);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export let persistor = persistStore(store);
