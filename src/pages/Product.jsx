import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import axios from "axios";

function Product() {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    getProductList();
  }, []);
  let { productId } = useParams();
  const baseURL = `https://fakestoreapi.com/products/${productId}`;
  const getProductList = async () => {
    const { data } = await axios.get(baseURL);
    setProductList(data);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Card sx={{ p: 6, boxShadow: 4 }}>
        <Stack direction={{ md: "row", justifyContent: "center" }} spacing={4}>
          {productList.length === 0 ? (
            <CircularProgress />
          ) : (
            <>
              <CardMedia
                component="img"
                height="300"
                image={productList.image}
                alt=""
                sx={{ width: "250px" }}
              />
              <Box>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: 600 }}
                  >
                    {productList.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {productList.description}
                  </Typography>
                  <Typography
                    variant="h3"
                    color="text.secondary"
                    sx={{ pt: 2 }}
                  >
                    {productList.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    sx={{ py: 2, px: 6 }}
                  >
                    Buy Now
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ py: 2, px: 6, backgroundColor: "#f57c00" }}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Box>
            </>
          )}
        </Stack>
      </Card>
    </Container>
  );
}

export default Product;
