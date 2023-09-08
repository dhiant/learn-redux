import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import CheckOut from "./pages/CheckOut";
import Cart from "./pages/Cart";
import { ThemeProvider, createTheme } from "@mui/material";

function App() {
	// create a theme
	const theme = createTheme();

	return (
		// provide a theme
		<ThemeProvider theme={theme}>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/product/:productId" element={<Product />} />
					<Route path="/checkout" element={<CheckOut />} />
					<Route path="cart" element={<Cart />} />
				</Route>
			</Routes>
		</ThemeProvider>
	);
}

export default App;
