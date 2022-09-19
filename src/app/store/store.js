import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../../reducer/ProductSlice";

export const store = configureStore({
  reducer: {
    productList: productReducer,
  },
});
