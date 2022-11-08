import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useSelector } from "react-redux";

// rows of datagrid
let product = [];

const Cart = () => {
  const [selectionModel, setSelectionModel] = useState([]);
  const [rows, setRows] = useState(product);

  const productInCart = useSelector((state) => state.productList.productInCart);

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
      sortable: true,
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 90,
      disableColumnMenu: true,
      // renderHeader: () => {
      //   return (
      //     <IconButton
      //       onClick={() => {
      //         const selectedIDs = new Set(selectionModel);
      //         // you can call an API to delete the selected IDs
      //         // and get the latest results after the deletion
      //         // then call setRows() to update the data locally here
      //         setRows((r) => r.filter((x) => !selectedIDs.has(x.id)));
      //       }}
      //     >
      //       <DeleteIcon />
      //     </IconButton>
      //   );
      // },
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
            width: { xs: "100%", lg: "75%" },
            boxShadow: 2,
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
            checkboxSelection
            disableSelectionOnClick
            disableColumnMenu
            disableColumnSelector
            pageSize={10}
            rowsPerPageOptions={[5]}
            rowCount={10}
            experimentalFeatures={{ newEditingApi: true }}
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
            paginationMode="server"
            keepNonExistentRowsSelected
          />
        </Stack>
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
      </Box>
    </>
  );
};

export default Cart;
