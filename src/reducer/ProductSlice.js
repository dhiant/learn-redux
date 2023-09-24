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
			const response = await axios.get("https://fakestoreapi.com/products");
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
			const productExists = state.productInCart.find(
				(product) => product.fetchProduct.id === action.payload.fetchProduct.id
			);
			if (productExists) {
				productExists.productQuantity += action.payload.productQuantity;
			} else {
				state.productInCart.push(action.payload);
			}
		},
		removeFromCart: (state, action) => {
			state.productInCart.pop(action.payload);
		},
		clearProductInCart: (state) => {
			state.productInCart = [];
		},
		incrementProductQuantity: (state, action) => {
			state.productInCart[action.payload].productQuantity += 1;
		},
		decrementProductQuantity: (state, action) => {
			if (state.productInCart[action.payload].productQuantity > 0) {
				state.productInCart[action.payload].productQuantity -= 1;
			}
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
