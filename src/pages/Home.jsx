import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  CardActions,
  Button,
  CardActionArea,
  Box,
  Modal,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProduct, isFetching } from "../reducer/ProductSlice";

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
            <Grid container spacing={6} justifyContent="center" sx={{ py: 8 }}>
              {productInStore[0].map((fetchProduct) => (
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
                      <Link to={`product/${fetchProduct.id}`}>
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
                        to={`product/${fetchProduct.id}`}
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
