import {
	Button,
	Box,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, fetchProduct, isFetching } from "../reducer/ProductSlice";

const OurProducts = ({ handleShowItemAddedModal }) => {
	const [showConnectionTimeOut, setShowConnectionTimeOut] = useState(false);
	const dispatch = useDispatch();

	const productInStore = useSelector((state) => state.productList.products);
	const isFetchingData = useSelector((state) => state.productList.fetching);
	console.log("isFetchingData", isFetchingData);

	useEffect(() => {
		dispatch(isFetching());
		// if data is still fetching and takes more than 2 min
		if (isFetchingData) {
			setTimeout(() => setShowConnectionTimeOut(true), 20000);
		}
		// if data fetching has completed
		else {
			// fetch all products from redux store
			dispatch(fetchProduct());
		}
	}, [dispatch, isFetchingData]);

	return (
		<>
			{productInStore.length === 0 ? (
				showConnectionTimeOut ? (
					<Box maxWidth="md">
						<Typography
							variant="h5"
							color="text.secondary"
							sx={{ py: 6, pl: 3 }}
						>
							Connection timed out
						</Typography>
					</Box>
				) : (
					<Typography variant="h6" sx={{ py: 6, pl: 3 }}>
						Loading...
					</Typography>
				)
			) : (
				<>
					<Typography
						variant="h1"
						sx={{
							fontSize: { xs: "1.8rem", sm: "2.5rem" },
							fontWeight: "bold",
							color: "#000",
							textAlign: "center",
							paddingTop: "40px",
						}}
					>
						Our <span style={{ color: "#ff5722" }}>Products</span>
					</Typography>
					<Grid container spacing={6} justifyContent="center" sx={{ py: 8 }}>
						{productInStore.length > 0 &&
							productInStore[0].map((fetchProduct) => (
								<Grid item key={fetchProduct.id} sx={{ mb: 6 }}>
									<Card
										sx={{
											width: { xs: 300, sm: 300 },
											height: 1,
											px: 2,
											py: 4,
											boxShadow: 3,
											position: "relative",
										}}
									>
										<CardActionArea>
											<Link to={`products/${fetchProduct.id}`}>
												<CardMedia
													component="img"
													height="200"
													image={fetchProduct.image}
													sx={{ objectFit: "contain" }}
												/>
											</Link>
											<CardContent>
												<Typography
													variant="h6"
													sx={{
														fontWeight: 600,
														display: "block",
														textOverflow: "ellipsis",
														wordWrap: "break-word",
														overflow: "hidden",
														whiteSpace: "nowrap",
														maxHeight: "2em",
														lineHeight: "1em",
													}}
												>
													{fetchProduct.title}
												</Typography>
												<Typography sx={{ fontSize: "25px", color: "#f57c00" }}>
													<span>$</span>
													{fetchProduct.price}
												</Typography>
											</CardContent>
										</CardActionArea>
										<CardActions sx={{ py: 1, px: 0 }}>
											<Button
												size="medium"
												color="primary"
												variant="outlined"
												component={Link}
												to={`products/${fetchProduct.id}`}
												sx={{
													fontSize: "20px",
													fontWeight: 600,
													borderWidth: 2,
													textTransform: "none",
													position: "absolute",
													bottom: "40px",
												}}
											>
												Details
											</Button>
											<Button
												size="medium"
												variant="outlined"
												sx={{
													fontSize: "20px",
													fontWeight: 500,
													borderWidth: 2,
													textTransform: "none",
													position: "absolute",
													bottom: "40px",
													right: "15px",
													color: "#fff",
													backgroundColor: "#f57c00",
													borderColor: "#f57c00",
													"&:hover": {
														backgroundColor: "#ff9800",
														borderColor: "#f57c00",
													},
												}}
												onClick={() => {
													dispatch(
														addToCart({ productQuantity: 1, fetchProduct })
													);
													handleShowItemAddedModal(fetchProduct.id);
												}}
											>
												Add to Cart
											</Button>
										</CardActions>
									</Card>
								</Grid>
							))}
					</Grid>
				</>
			)}
		</>
	);
};

export default OurProducts;
