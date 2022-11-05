import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  fetching: false,
  products: [],
  productInCart: [],
};

export const fetchProduct = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://fakestoreapi.com/products/category/women's%20clothing"
      );
      let products = response.data;
      dispatch(allProducts(products));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.config);
      }
    }
  };
};

export const productSlice = createSlice({
  name: "productItem",
  initialState,
  reducers: {
    allProducts: (state, action) => {
      state.products.push(action.payload);
    },
    addToCart: (state, action) => {
      if (state.productInCart.length === 0) {
        state.productInCart.unshift(action.payload);
      } else {
        // need to convert proxy into json string first and then get js object after json.parse method
        let productIdInReduxStore = JSON.parse(
          JSON.stringify(state.productInCart[0].fetchProduct.id)
        );
        let productIdFromActionPayload = action.payload.fetchProduct.id;

        if (productIdInReduxStore !== productIdFromActionPayload) {
          state.productInCart.unshift();
        } else {
          state.productInCart.shift(action.payload);
        }
      }
      // console.log(
      //   "action payload",
      //   action.payload.fetchProduct.id,
      //   "store id",
      //   JSON.parse(JSON.stringify(state.productInCart[0].fetchProduct.id))
      // );
    },
    removeFromCart: (state, action) => {
      state.productInCart.pop(action.payload);
    },
    clearProductInCart: (state) => {
      state.productInCart = [];
    },
    incrementProductQuantity: (state) => {
      state.productInCart[0].productQuantity += 1;
    },
    decrementProductQuantity: (state) => {
      state.productInCart[0].productQuantity -= 1;
    },
    isFetching: (state) => {
      state.fetching = true;
    },
  },
});

export const {
  allProducts,
  clearProductInCart,
  addToCart,
  removeFromCart,
  incrementProductQuantity,
  decrementProductQuantity,
  isFetching,
} = productSlice.actions;
export default productSlice.reducer;
