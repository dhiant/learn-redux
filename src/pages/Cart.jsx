import React from "react";
import { Container, Button, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ProductItemCard from "../components/ProductItemCard";
import { Link } from "react-router-dom";

const Cart = () => {
	const productsInCart = useSelector(
		(state) => state.productList.productInCart
	);

	const totalPriceOfAllCartItems = productsInCart.reduce(
		(acc, currentProduct) => {
			let qty = currentProduct.productQuantity;
			let rate = currentProduct.fetchProduct.price;
			let price = qty * rate;
			return price + acc;
		},
		0
	);

	return (
		<>
			<Container
				sx={{
					my: 4,
					px: 4,
				}}
				maxWidth="xl"
			>
				<Stack
					sx={{
						// maxWidth: "1700px",
						width: 1,
						boxShadow: 2,
						"& .quantity--cell": {
							backgroundColor: "#5bace585",
						},
					}}
				>
					<Typography
						variant="h1"
						sx={{
							fontSize: { xs: "1.8rem", sm: "2.5rem" },
							fontWeight: "bold",
							color: "#000",
							textAlign: "start",
							p: 2,
						}}
					>
						My{" "}
						<span style={{ color: "#f57c00" }}>
							Cart ({productsInCart.length})
						</span>
					</Typography>

					{/* each cart items */}
					{productsInCart.length > 0 ? (
						<>
							{productsInCart.map((item, idx) => (
								<ProductItemCard
									idx={idx}
									img={item.fetchProduct.image}
									title={item.fetchProduct.title}
									desc={item.fetchProduct.description}
									rate={item.fetchProduct.price}
									qty={item.productQuantity}
								/>
							))}
							{/* total price of all items in cart */}
							<Typography
								sx={{
									fontSize: {
										xs: "20px",
										md: "24px",
									},
									fontWeight: 600,
									textAlign: "end",
									pr: 2,
								}}
							>
								Total:{" "}
								<span
									style={{
										color: "#f57c00",
										fontSize: {
											xs: "1.5rem",
											md: "2rem",
										},
									}}
								>
									${totalPriceOfAllCartItems.toFixed(2)}
								</span>
							</Typography>

							<Button
								variant="contained"
								component={Link}
								to="/checkout"
								sx={{
									py: "12px",
									// maxWidth: "400px",
									// margin: "auto",
									mt: 2,
								}}
							>
								Proceed to checkout
							</Button>
						</>
					) : (
						<Typography
							variant="h2"
							sx={{
								fontSize: { xs: "1.5rem", xl: "2rem" },
								fontWeight: "semi-bold",
								color: "#000",
								textAlign: "center",
								pb: 2,
							}}
						>
							Cart is empty.
						</Typography>
					)}
				</Stack>
			</Container>
		</>
	);
};

export default Cart;
