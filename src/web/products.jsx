import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios/axios";
import {
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@mui/material";
import SearchBar from "../components/layout/searchBar";

function Products() {
  const [products, setProducts] = useState([]);
  const { category_id } = useParams();
  const { specie_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (category_id) {
          response = await axios.getProductsByCategory(category_id);
        } else if (specie_id) {
          response = await axios.getProductsBySpecie(specie_id);
        } else {
          response = await axios.getAllProducts();
        }

        const productsData = response.data.data;
        if (Array.isArray(productsData)) {
          setProducts(productsData);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [category_id, specie_id]);

  const handleCardClick = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  const handleSearch = async (name) => {
    try {
      if (name.trim()) {
        const response = await axios.getProductsByName(name);
        const productsData = response.data.data;
        setProducts(productsData);
      } else {
        const response = await axios.getAllProducts();
        const allProductsData = response.data.data;
        setProducts(allProductsData);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setProducts([]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "75px",
        paddingBottom: "50px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <SearchBar onSearch={handleSearch} />
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  width: "100%",
                  maxWidth: "300px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  margin: "auto",
                }}
                onClick={() => handleCardClick(product)}
              >
                <CardActionArea sx={{ flexGrow: 1 }}>
                  <CardMedia
                    component="img"
                    image={product.url}
                    alt={product.name}
                    sx={{ height: "200px", objectFit: "cover" }}
                  />
                  <CardContent sx={{ paddingBottom: "2px" }}>
                    <Typography
                      sx={{ fontFamily: "Poppins-Bold", color: "#A8A8A8" }}
                    >
                      {product.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "5px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Poppins-Bold",
                          color: "#A8A8A8",
                          fontSize: "1.2rem",
                        }}
                      >
                        R$ {product.price}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            Nenhum produto disponível.
          </Typography>
        )}
      </Grid>
    </div>
  );
}

export default Products;
