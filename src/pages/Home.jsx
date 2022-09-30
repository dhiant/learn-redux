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
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, isFetching } from "../reducer/ProductSlice";

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
          <Navbar />
          <Container maxWidth="xl">
            <Box sx={{ xs: { px: 4 }, mx: "auto" }}>
              <Grid
                container
                spacing={6}
                justifyContent={{
                  xs: "center",
                  xl: "space-between",
                }}
                sx={{ py: 8 }}
              >
                {productInStore[0].map((product) => (
                  <Grid item key={product.id} sx={{ mb: 6 }}>
                    <Card
                      sx={{
                        width: { xs: 260, sm: 300, md: 350, lg: 400, xl: 400 },
                        height: 1,
                        px: 2,
                        py: 4,
                        boxShadow: 8,
                        position: "relative",
                      }}
                    >
                      <CardActionArea>
                        <Link to={`product/${product.id}`}>
                          <CardMedia
                            component="img"
                            height="300"
                            image={product.image}
                            sx={{ objectFit: "contain" }}
                          />
                        </Link>
                        <CardContent>
                          <Typography
                            variant="h6"
                            component="div"
                            gutterBottom
                            sx={{ fontWeight: 600 }}
                          >
                            {product.title}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "25px", color: "#f57c00" }}
                          >
                            <span>$</span>
                            {product.price}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions sx={{ py: 2, px: 0 }}>
                        <Button
                          size="large"
                          color="primary"
                          variant="outlined"
                          href={`product/${product.id}`}
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
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};
export default Home;
