import React, { useState, useEffect } from "react";
import { Typography, Box, Modal } from "@mui/material";
import { Container } from "@mui/system";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, isFetching } from "../reducer/ProductSlice";
import HeroSection from "../components/HeroSection";
import OurProducts from "./OurProducts";

const style = (theme) => ({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	minWidth: "250px",
	bgcolor: "background.paper",
	border: "none",
	boxShadow: 24,
	px: 4,
	py: 3,
	[theme.breakpoints.up("sm")]: {
		width: "max-content",
	},
});

const Home = () => {
	const [showConnectionTimeOut, setShowConnectionTimeOut] = useState(false);
	const [showItemAddedModal, setShowItemAddedModal] = useState(false);

	const dispatch = useDispatch();
	const productInStore = useSelector((state) => state.productList.products);
	const fetchingData = useSelector((state) => state.productList.fetching);
	const productInCart = useSelector((state) => state.productList.productInCart);

	const handleShowItemAddedModal = (id) => {
		let showModal = productInCart.find(
			(product) => product.fetchProduct.id === id
		);
		if (!showModal) {
			setShowItemAddedModal(true);
		} else {
			setShowItemAddedModal(false);
		}
	};
	const handleHideItemAddedModal = () => setShowItemAddedModal(false);

	useEffect(() => {
		if (productInStore.length === 0) {
			setTimeout(() => setShowConnectionTimeOut(true), 20000);
		}
		if (fetchingData === false) {
			dispatch(fetchProduct());
		}
		dispatch(isFetching());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
					<Container maxWidth="xl" sx={{ px: 0 }}>
						<HeroSection />

						{/* our products */}
						<OurProducts handleShowItemAddedModal={handleShowItemAddedModal} />

						{/* Item added modal goes here */}
						{showItemAddedModal && (
							<Modal
								open={showItemAddedModal}
								onClose={handleHideItemAddedModal}
								aria-labelledby="modal-modal-title"
								aria-describedby="modal-modal-description"
							>
								<Box sx={style}>
									<CancelIcon
										sx={{
											position: "absolute",
											right: "5px",
											top: "5px",
											cursor: "pointer",
											fill: "green",
											fontSize: "30px",
										}}
										onClick={handleHideItemAddedModal}
									/>
									<Typography
										id="modal-modal-title"
										variant="caption"
										component="h2"
										color="green"
										align="center"
										sx={{ lineHeight: "30px", fontSize: { sm: "20px" } }}
									>
										Product has been added to your cart.
									</Typography>
								</Box>
							</Modal>
						)}
					</Container>
				</>
			)}
		</>
	);
};
export default Home;
