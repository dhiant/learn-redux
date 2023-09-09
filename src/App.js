import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import CheckOut from "./pages/CheckOut";
import Cart from "./pages/Cart";
import { ThemeProvider, createTheme } from "@mui/material";
import AboutUsPage from "./pages/AboutUSPage";
import ContactUsPage from "./pages/ContactUsPage";
import OurProducts from "./components/OurProducts";

function App() {
	// create a theme
	const theme = createTheme();

	return (
		// provide a theme
		<ThemeProvider theme={theme}>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="products" element={<OurProducts />} />
					<Route path="products/:productId" element={<Product />} />

					<Route path="/checkout" element={<CheckOut />} />
					<Route path="cart" element={<Cart />} />
					<Route path="about-us" element={<AboutUsPage />} />
					<Route path="contact-us" element={<ContactUsPage />} />
				</Route>
			</Routes>
		</ThemeProvider>
	);
}

export default App;
