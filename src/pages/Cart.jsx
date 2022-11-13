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

// rows of datagrid
let product = [];

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

  return (
    <>
      <Box
        sx={{
          mt: 4,
          px: 4,
          position: "relative",
          display: "flex",
          gap: 4,
          flexDirection: { xs: "column", md: "row" },
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
              color: "gray",
              pt: 2,
              p: 4,
            }}
          >
            Shopping Items
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
          />
        </Stack>
      </Box>
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
        <Typography variant="h6" color="gray" sx={{ fontSize: "20px" }}>
          No items selected
        </Typography>
        <Button
          size="small"
          variant="contained"
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
    </>
  );
};

export default Cart;
