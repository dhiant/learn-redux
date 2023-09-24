import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ProductItemCard from "../components/ProductItemCard";

const Cart = () => {
	const productsInCart = useSelector(
		(state) => state.productList.productInCart
	);

	return (
		<>
			<Box
				sx={{
					my: 4,
					px: 4,
				}}
			>
				<Stack
					sx={{
						maxWidth: "1700px",
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
				</Stack>
			</Box>
		</>
	);
};

export default Cart;
