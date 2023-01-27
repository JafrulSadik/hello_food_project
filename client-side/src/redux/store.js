import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import userSlice from "./features/auth/userSlice";
import productSlice from "./features/product/productSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  product: productSlice,
});

export default configureStore({ reducer: rootReducer });

// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import userSlice from "./userSlice";
// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
//   } from "redux-persist";
//   import storage from "redux-persist/lib/storage";

//   const persistConfig = {
//     key: "root",
//     version: 1,
//     storage,
//   };

//   const persistedReducer = persistReducer(persistConfig, userSlice)

// export const store = configureStore({
//     reducer:  persistedReducer,
//         middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//               },
//         }),
// })

// export let persistor = persistStore(store)
