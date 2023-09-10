import {
	Avatar,
	Box,
	Button,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../reducer/ProductSlice";
import { Link } from "react-router-dom";

// rows of datagrid
let product = [];
// sum of total price of all products
let allProductTotalPrice = null;

const Cart = () => {
	const [rows, setRows] = useState(product);

	const productInCart = useSelector((state) => state.productList.productInCart);
	const dispatch = useDispatch();

	// columns of datagrid
	const columns = [
		{
			field: "id",
			headerName: "ID",
			width: 10,
			editable: false,
			sortable: false,
		},
		{
			field: "img",
			headerName: "Img",
			width: 50,
			editable: false,
			sortable: false,
			renderCell: (params) => {
				let imgSrc = params.value;
				return (
					<>
						<Avatar src={imgSrc} />
					</>
				);
			},
		},
		{
			field: "name",
			headerName: "Product Name",
			width: 250,
			editable: false,
			sortable: false,
		},
		{
			field: "desc",
			headerName: "Description",
			headerAlign: "center",
			type: "number",
			width: 300,
			sortable: false,
		},
		{
			field: "quantity",
			headerName: "Quantity",
			sortable: false,
			width: 80,
			editable: true,
			cellClassName: "quantity--cell",
		},
		{
			field: "price",
			headerName: "Rate",
			width: 80,
			editable: false,
			sortable: true,
		},
		{
			field: "total",
			headerName: "Total",
			width: 100,
			editable: false,
			sortable: false,
			valueGetter: getTotalPrice,
		},
		{
			field: "delete",
			headerName: "Delete",
			sortable: false,
			width: 90,
			disableColumnMenu: true,
			renderCell: (params) => {
				return (
					<IconButton
						onClick={() => {
							// id of selected row
							let selectedProductId = params.id;

							setRows((prev) =>
								prev.filter((product) => product.id !== selectedProductId)
							);
							dispatch(removeFromCart());
						}}
					>
						<ClearIcon />
					</IconButton>
				);
			},
		},
	];

	// rows of datagrid
	product = productInCart.map((productDetails) => {
		let fetchProduct = productDetails.fetchProduct;
		let productQuantity = productDetails.productQuantity;
		let newObj = {
			id: fetchProduct.id,
			img: fetchProduct.image,
			name: fetchProduct.title,
			desc: fetchProduct.description,
			quantity: productQuantity,
			price: fetchProduct.price,
			total: productQuantity * fetchProduct.price,
		};

		return newObj;
	});

	function getTotalPrice(params) {
		let newTotalPrice = +params.row.quantity * params.row.price;
		return `${newTotalPrice || params.value}`;
	}

	function processRowUpdate(updatedRow) {
		setRows((prevRows) => {
			let updatedRows = prevRows.map((product) => {
				return product.id === updatedRow.id
					? {
							...product,
							quantity: +updatedRow.quantity,
							total: updatedRow.total,
					  }
					: { ...product };
			});
			return updatedRows;
		});
		return updatedRow;
	}

	function handleProcessRowUpdateError(error) {
		console.log("erros in processRowUpdate", error);
	}
	// calculte allProductsTotalPrice
	if (rows.length > 0) {
		allProductTotalPrice = rows.reduce((acc, product) => {
			let newTotalPrice = product.quantity * product.price;
			return (acc += newTotalPrice);
		}, 0);
	}
	return (
		<>
			<Box
				sx={{
					my: 4,
					px: 4,
					position: "relative",
					display: "flex",
					gap: 4,
					flexDirection: { xs: "column", md: "row" },
					alignItems: { xs: "center", md: "flex-start" },
				}}
			>
				<Stack
					sx={{
						maxWidth: "1600px",
						width: 1,
						boxShadow: 2,
						"& .quantity--cell": {
							backgroundColor: "#5bace585",
						},
					}}
				>
					{/*  */}
					<Typography
						variant="h1"
						sx={{
							fontSize: { xs: "20px", sm: "30px" },
							fontWeight: 500,
							color: "black",
							p: 2,
						}}
					>
						Shopping Items
					</Typography>
					<Typography
						variant="caption"
						sx={{
							fontSize: { xs: "12px", sm: "18px" },
							color: "#1565c0",
							pb: 2,
						}}
						align="center"
					>
						Note: Double Click in Quantity cell to edit.
					</Typography>
					<DataGrid
						autoHeight
						rows={rows}
						columns={columns}
						checkboxSelection={false}
						disableColumnMenu
						disableColumnSelector
						experimentalFeatures={{ newEditingApi: true }}
						hideFooter={true}
						editMode="row"
						processRowUpdate={processRowUpdate}
						onProcessRowUpdateError={handleProcessRowUpdateError}
					/>
				</Stack>
				{/* proceed to checkout */}
				{rows.length > 0 && (
					<Box
						sx={{
							mr: 2,
							width: "max-content",
							minWidth: "200px",
							height: "max-content",
							boxShadow: 2,
							p: 2,
						}}
					>
						<Typography
							variant="h1"
							color="black"
							sx={{ fontSize: "20px", fontWeight: 500 }}
						>
							Total Products:
							<Typography
								component="span"
								sx={{ fontSize: "20px", fontWeight: 500, color: "#1565c0" }}
							>
								{rows.length}
							</Typography>
						</Typography>
						<Typography
							variant="h1"
							color="black"
							sx={{ fontSize: "20px", fontWeight: 500, pb: 2 }}
						>
							Cart Subtotal:{" "}
							<Typography
								component="span"
								sx={{ fontSize: "20px", fontWeight: 500, color: "#f57c00" }}
							>
								${Math.floor(allProductTotalPrice)}
							</Typography>
						</Typography>
						<Button
							size="small"
							variant="contained"
							component={Link}
							to="/checkout"
							sx={{
								py: 1,
								px: 1,

								width: "100%",
								borderRadius: "20px",
								textTransform: "none",
								backgroundColor: "#f57c00",
								"&:hover": {
									backgroundColor: "#ff9800",
								},
							}}
						>
							Proceed to checkout
						</Button>
					</Box>
				)}
			</Box>
		</>
	);
};

export default Cart;
