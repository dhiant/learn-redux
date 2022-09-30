import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "../reducer/ProductSlice";
import userDataReducer from "../reducer/userDataSlice";

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    userData: userDataReducer,
  },
});
