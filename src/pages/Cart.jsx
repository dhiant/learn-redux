import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const productInCart = useSelector((state) => state.productList.productInCart);

  useEffect(() => {}, []);
  return (
    <Container sx={{ maxWidth: "1300px", p: { xs: 1, sm: 3 } }}>
      {productInCart.length > 0
        ? productInCart.map((product) => (
            <Card
              sx={{
                p: { xs: 2, sm: 6 },
                boxShadow: 4,
                mt: { xs: 4, md: 6, xl: 10 },
              }}
              key={product.id}
            >
              <Stack
                direction={{ md: "row", justifyContent: "center" }}
                spacing={4}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={product.image}
                  alt=""
                  sx={{
                    // backgroundPosition: "top",
                    objectFit: "contain",
                    width: { xs: 1, sm: "250px" },
                  }}
                />
                <Box>
                  <CardContent sx={{ p: 0 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ pt: 2, fontWeight: 600 }}
                    >
                      {product.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography
                      // variant="h3"
                      // color="text.secondary"
                      sx={{
                        fontSize: {
                          xs: "2rem",
                          md: "3rem",
                        },
                        pt: 2,
                        color: "#f57c00",
                      }}
                    >
                      ${product.price}
                    </Typography>
                  </CardContent>
                  <Typography sx={{ fontWeight: 600 }}>Quantity:</Typography>
                  <Stack
                    direction="row"
                    spacing={{ xs: 1, sm: 3 }}
                    alignItems="center"
                  >
                    <Button
                      sx={{
                        width: "5px",
                        height: "15px",
                        py: 3,
                        // px: 6,
                        px: { xs: 4, sm: 6 },
                        backgroundColor: "#eeeeee",
                        "&:hover": { backgroundColor: "#e0e0e0" },
                      }}
                      // onClick={() => handleAddItemToStore(fetchProduct)}
                      disabled={product.length === 10 ? true : false}
                    >
                      <AddIcon sx={{ color: "" }} />
                    </Button>
                    <Typography sx={{ fontSize: "40px" }}>
                      {product.length}
                    </Typography>
                    <Button
                      sx={{
                        width: "5px",
                        height: "15px",
                        py: 3,
                        px: { xs: 4, sm: 6 },
                        backgroundColor: "#eeeeee",
                        "&:hover": { backgroundColor: "#e0e0e0" },
                      }}
                      // onClick={() => handleRemoveItemFromStore(fetchProduct)}
                      disabled={product.length === 0 ? true : false}
                    >
                      <RemoveIcon />
                    </Button>
                  </Stack>
                  <CardActions
                    sx={{
                      px: 0,
                      justifyContent: { xs: "center", sm: "flex-start" },
                    }}
                  >
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      mt={4}
                      spacing={3}
                    >
                      {/* <TextField
                    placeholder="Enter Voucher Code"
                    sx={{}}
                  ></TextField>
                  <Button
                    variant="contained"
                    sx={{
                      py: { xs: 1, sm: 2 },
                      // py: 2,
                      px: 6,
                      backgroundColor: "#1565c0",
                      "&:hover": { backgroundColor: "#2962ff" },
                    }}
                    // onClick={handleOpenLogIn}
                  >
                    apply
                  </Button> */}
                    </Stack>
                  </CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      py: { xs: 1, sm: 2 },
                      // py: 2
                      width: "100%",
                      backgroundColor: "#f57c00",
                      "&:hover": {
                        backgroundColor: "#ff9800",
                      },
                    }}
                    // onClick={handleOpenLogIn}
                  >
                    Process to checkout
                  </Button>
                </Box>
              </Stack>
            </Card>
          ))
        : "No product has been added to cart."}
    </Container>
  );
};

export default Cart;
