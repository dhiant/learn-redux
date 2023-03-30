import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
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
  Modal,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToCart } from "../reducer/ProductSlice";
import LogInCard from "../components/LogInCard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

function Product() {
  const [fetchProduct, setFetchProduct] = useState([]);
  const [showLogInCard, setShowLogInCard] = useState(false);
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);

  let { productId } = useParams();
  const dispatch = useDispatch();
  const baseURL = `https://fakestoreapi.com/products/${productId}`;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    bgcolor: "background.paper",
    border: "2px solid #fff",
    boxShadow: 24,
    px: 10,
    py: 4,
    scrollable: true,
  };

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

  const handleAddItemToStore = (fetchProduct) => {
    dispatch(addToCart({ productQuantity, fetchProduct }));
  };

  const handleOpenLogIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setShowAddToCart(true);
        dispatch(addToCart({productQuantity,fetchProduct}))
      } else {
        setShowLogInCard(true);
      }
    });
  };
  const handleCloseLogIn = () => setShowLogInCard(false);
  const handleAddToCartClose = () => setShowAddToCart(false);

  useEffect(() => {
    getProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container
        sx={{ maxWidth: "1300px", p: { xs: 1, sm: 3 }, position: "relative" }}
      >
        <Container maxWidth="md" sx={{ my: { xs: 2 } }}>
          <Card sx={{ p: { xs: 2 }, boxShadow: 4 }}>
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
                          position:"relative",
                          width: "5px",
                          height: "15px",
                          py: 3,
                          // px: 6,
                          px: { xs: 4, sm: 6 },
                          backgroundColor: "#eeeeee",
                          "&:hover": { backgroundColor: "#e0e0e0" },
                        }}
                        onClick={() => setProductQuantity((prev) => prev + 1)}
                        disabled={productQuantity === 10 ? true : false}
                      >
                        <AddIcon sx={{ color: "" ,position:"absolute"}} />
                      </Button>
                      <Typography sx={{ fontSize: "40px" }}>
                        {productQuantity}
                      </Typography>
                      <Button
                        sx={{
                          position:"relative",
                          width: "5px",
                          height: "15px",
                          py: 3,
                          px: { xs: 4, sm: 6 },
                          backgroundColor: "#eeeeee",
                          "&:hover": { backgroundColor: "#e0e0e0" },
                        }}
                        onClick={() => setProductQuantity((prev) => prev - 1)}
                        disabled={productQuantity === 1 ? true : false}
                      >
                        <RemoveIcon sx={{position:"absolute"}}/>
                      </Button>
                    </Stack>
                    <CardActions
                      sx={{
                        mt:1,
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
                          onClick={() => {
                            handleOpenLogIn();
                            handleAddItemToStore(fetchProduct);
                          }}
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

      {/* Add To Cart Modal */}
      {showAddToCart && (
        <Modal
          open={showAddToCart}
          onClose={handleAddToCartClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color="green"
            >
              {productQuantity} item(s) have been added to your cart.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              sx={{ mt: 2 }}
            >
              <Button
                variant="contained"
                sx={{
                  py: { xs: 1 },
                  // py: 2,
                  px: 6,
                  color: "#000",
                  backgroundColor: "#fff",
                  "&:hover": { backgroundColor: "#ffa522", color: "#000" },
                  border: "2px solid #ffa522",
                }}
                component={Link}
                to="/cart"
              >
                Go to Cart
              </Button>
              <Button
                size="small"
                variant="contained"
                sx={{
                  py: { xs: 1 },
                  // py: 2,
                  px: 6,
                  backgroundColor: "#f57c00",
                  "&:hover": {
                    backgroundColor: "#ffa522",
                    color: "#000",
                    border: "2px solid #ffa522",
                  },
                }}
                component={Link}
                to="/checkout"
              >
                Check out
              </Button>
            </Stack>
          </Box>
        </Modal>
      )}
    </>
  );
}

export default Product;
