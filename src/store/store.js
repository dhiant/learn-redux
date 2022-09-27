import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducer/ProductSlice";
import userDataReducer from "../reducer/userDataSlice";

export const store = configureStore({
  reducer: {
    productList: productReducer,
    user: userDataReducer,
  },
});
