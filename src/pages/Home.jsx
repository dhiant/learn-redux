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
} from "@mui/material";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProduct, isFetching } from "../reducer/ProductSlice";

const Home = () => {
  const [showConnectionTimeOut, setShowConnectionTimeOut] = useState(false);

  const dispatch = useDispatch();
  const productInStore = useSelector((state) => state.productList.products);
  const fetchingData = useSelector((state) => state.productList.fetching);

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
              variant="h3"
              color="text.secondary"
              sx={{ py: 4, letterSpacing: "2px", lineHeight: "4.5rem" }}
            >
              Connection timed out
            </Typography>
          </Box>
        ) : (
          <Typography variant="h6" sx={{ py: 4 }}>
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
                        onClick={() =>
                          dispatch(
                            addToCart({ productQuantity: 1, fetchProduct })
                          )
                        }
                      >
                        Add to Cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};
export default Home;
