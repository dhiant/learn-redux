import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const productSlice = createSlice({
  name: "productItem",
  initialState,
  reducers: {
    addToCarT: (state, action) => {
      state.products.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.products.pop(action.payload);
    },
  },
});

export const { addToCarT, removeFromCart } = productSlice.actions;
export default productSlice.reducer;
