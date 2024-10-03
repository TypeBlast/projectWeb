import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import BoxCreateProduct from '../components/layout/boxCreateProducts';
import axios from "../../../axios/axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.getAllProducts(); 
      const productsData = response.data.data;
      setProducts(productsData);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container" style={{ padding: "20px" }}>
           <BoxCreateProduct/>
           
      {Array.isArray(products) && products.length > 0 ? (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card sx={{ margin: "10px" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.url}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    R$ {product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary">
          Nenhum produto disponível.
        </Typography>
      )}
    </div>
  );
}

export default AdminProducts;
