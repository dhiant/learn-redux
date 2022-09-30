import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Box,
  Container,
  CircularProgress,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToCart, removeFromCart } from "../reducer/ProductSlice";
import Navbar from "../components/Navbar";
import LogInCard from "../components/LogInCard";

function Product() {
  const [fetchProduct, setFetchProduct] = useState([]);
  const [showLogInCard, setShowLogInCard] = useState(false);

  let { productId } = useParams();
  const dispatch = useDispatch();
  const productInCart = useSelector((state) => state.productList.productInCart);
  const baseURL = `https://fakestoreapi.com/products/${productId}`;
  const getProductList = async () => {
    await axios
      .get(baseURL)
      .then((response) => {
        let data = response.data;
        setFetchProduct(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  useEffect(() => {
    getProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddItemToStore = (fetchProduct) => {
    dispatch(addToCart(fetchProduct));
  };
  const handleRemoveItemFromStore = (fetchProduct) => {
    dispatch(removeFromCart(fetchProduct));
  };
  const handleOpenLogIn = () => setShowLogInCard(true);
  const handleCloseLogIn = () => setShowLogInCard(false);
  return (
    <>
      <Navbar />
      <Container
        sx={{ maxWidth: "1300px", p: { xs: 1, sm: 3 }, position: "relative" }}
      >
        <Container maxWidth="md" sx={{ mt: { xs: 2, sm: 10 } }}>
          <Card sx={{ p: { xs: 2, sm: 6 }, boxShadow: 4 }}>
            <Stack
              direction={{ md: "row", justifyContent: "center" }}
              spacing={4}
            >
              {fetchProduct.length === 0 ? (
                <CircularProgress />
              ) : (
                <>
                  <CardMedia
                    component="img"
                    height="300"
                    image={fetchProduct.image}
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
                        {fetchProduct.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {fetchProduct.description}
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
                        ${fetchProduct.price}
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
                        onClick={() => handleAddItemToStore(fetchProduct)}
                        disabled={productInCart.length === 10 ? true : false}
                      >
                        <AddIcon sx={{ color: "" }} />
                      </Button>
                      <Typography sx={{ fontSize: "40px" }}>
                        {productInCart.length}
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
                        onClick={() => handleRemoveItemFromStore(fetchProduct)}
                        disabled={productInCart.length === 0 ? true : false}
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
                        spacing={3}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            py: { xs: 1, sm: 2 },
                            // py: 2,
                            px: 6,
                            backgroundColor: "#1565c0",
                            "&:hover": { backgroundColor: "#2962ff" },
                          }}
                          onClick={handleOpenLogIn}
                        >
                          Buy Now
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          sx={{
                            py: { xs: 1, sm: 2 },
                            // py: 2,
                            px: 6,
                            backgroundColor: "#f57c00",
                            "&:hover": {
                              backgroundColor: "#ff9800",
                            },
                          }}
                          onClick={handleOpenLogIn}
                        >
                          Add to Cart
                        </Button>
                      </Stack>
                    </CardActions>
                  </Box>
                </>
              )}
            </Stack>
          </Card>
        </Container>
      </Container>
      {showLogInCard && (
        <LogInCard
          showLogInCard={showLogInCard}
          handleCloseLogIn={handleCloseLogIn}
        />
      )}
    </>
  );
}

export default Product;
