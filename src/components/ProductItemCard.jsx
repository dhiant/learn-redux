import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import {
	decrementProductQuantity,
	incrementProductQuantity,
} from "../reducer/ProductSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductItemCard = ({ idx, img, title, desc, rate, qty }) => {
	const dispatch = useDispatch();
	return (
		<Stack
			direction="row"
			// alignItems="flex-start"
			justifyContent="space-between"
			sx={{ p: 2 }}
			flexDirection={{ xs: "column", lg: "row" }}
		>
			<Box
				sx={{
					display: "flex",
					columnGap: "10px",
					maxWidth: "600px",
				}}
			>
				<Box
					sx={{
						width: "80px",
						height: "80px",
						borderRadius: "10px",
						boxShadow: 3,
						display: "flex",
						justifyItems: "center",
						alignItems: "center",
					}}
				>
					<img
						src={img}
						alt="product"
						style={{
							width: "70px",
							height: "70px",
							objectFit: "contain",
							margin: "auto",
						}}
					/>
				</Box>
				{/* product title & desc */}
				<Box sx={{ textOverflow: "clip", overflow: "hidden" }}>
					<Typography
						variant="h2"
						sx={{
							fontSize: { xs: "20px", xl: "24px" },
							fontWeight: "bold",
							color: "#000",
							maxWidth: "500px",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
						}}
					>
						{title}
					</Typography>
					<Typography
						paragraph
						sx={{
							fontSize: "12px",
							color: "gray",
							maxWidth: "500px",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
							marginBottom: 0,
						}}
					>
						{desc}
					</Typography>
					<Typography
						sx={{
							fontSize: {
								xs: "1rem",
								lg: "1.5rem",
							},
							color: "#f57c00",
						}}
					>
						${rate}
					</Typography>
				</Box>
			</Box>

			{/* product quantity increment/decrement */}
			<Box
				sx={{
					display: "flex",
					columnGap: "10px",
					alignItems: "center",
					mt: { xs: 1, lg: 0 },
				}}
			>
				<Button
					sx={{
						position: "relative",
						width: "5px",
						height: "15px",
						py: 2,
						px: 3,
						backgroundColor: "#eeeeee",
						"&:hover": { backgroundColor: "#e0e0e0" },
					}}
					onClick={() => dispatch(incrementProductQuantity(idx))}
				>
					<AddIcon sx={{ color: "", position: "absolute" }} />
				</Button>
				{/* product quantity */}
				<Typography
					variant="caption"
					sx={{ fontSize: { xs: "1.5rem", lg: "2rem" } }}
				>
					{qty}
				</Typography>
				<Button
					sx={{
						position: "relative",
						width: "5px",
						height: "15px",
						py: 2,
						px: 3,
						backgroundColor: "#eeeeee",
						"&:hover": { backgroundColor: "#e0e0e0" },
					}}
					onClick={() => dispatch(decrementProductQuantity(idx))}
				>
					<RemoveIcon sx={{ color: "", position: "absolute" }} />
				</Button>
			</Box>

			{/* product total price */}
			<Typography
				sx={{
					fontSize: {
						xs: "1rem",
						lg: "1.5rem",
					},
					color: "#f57c00",
					pt: { lg: 2 },
					minWidth: "100px",
				}}
			>
				${(rate * qty).toFixed(2)}
			</Typography>
		</Stack>
	);
};

export default ProductItemCard;
