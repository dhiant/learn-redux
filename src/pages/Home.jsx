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
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";

const Home = () => {
  const [productList, setProductList] = useState([]);
  const baseURL =
    "https://fakestoreapi.com/products/category/women's%20clothing";
  const fetchProduct = async () => {
    await axios
      .get(baseURL)
      .then((response) => {
        let data = response.data;
        setProductList(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.config);
        }
      });
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        {productList.length === 0 ? (
          <Typography variant="h6" sx={{ py: 4 }}>
            Loading...
          </Typography>
        ) : (
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
              {productList.map((product) => (
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
                        <Typography sx={{ fontSize: "25px", color: "#f57c00" }}>
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
        )}
      </Container>
    </>
  );
};
export default Home;
