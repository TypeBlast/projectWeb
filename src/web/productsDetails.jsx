import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Box, Button, Grid, Typography, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import axios from "../axios/axios";

function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product;

  const [isTextExpanded, setTextExpanded] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product || product.id !== parseInt(id)) {
    return <div>Produto não encontrado</div>;
  }

  const truncatedDescription =
    product.description.length > 200
      ? `${product.description.substring(0, 200)}...`
      : product.description;

  const showReadMoreButton = product.description.length > 200;

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      const itemToAdd = {
        productId: product.id,
        quantity,
      };
      const response = await axios.addToCart(itemToAdd);
      alert(response.data.message);
    } catch (error) {
      console.error(
        "Erro ao adicionar produto ao carrinho:",
        error.response.data.message
      );
      alert(error.response.data.message);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const increaseQuantity = () =>
    setQuantity((prevQuantity) => prevQuantity + 1);
  const decreaseQuantity = () =>
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="calc(100vh - 64px)"
      paddingTop="64px"
    >
      <Box
        width="80%"
        maxWidth="900px"
        border="3px solid #BFBFBF"
        borderRadius="15px"
        minHeight="450px"
        paddingBottom="10px"
        margin="auto"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              display={{ xs: "flex", md: "flex" }}
              justifyContent="center"
              alignItems="center"
              minHeight="325px"
            >
              <img
                src={product.url}
                style={{
                  maxWidth: "300px",
                  width: { xs: "100%", md: "75%" },
                  maxHeight: "250px",
                }}
              />
            </Box>
            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins-Bold",
                  fontSize: "1.3rem",
                  marginLeft: { xs: 0, md: "25px" },
                  textAlign: "left",
                }}
              >
                {product.name}
              </Typography>

              <Typography
                sx={{
                  fontFamily: "Poppins-Bold",
                  color: "#A8A8A8",
                  fontSize: "1.3rem",
                  marginLeft: { xs: 0, md: "50px" },
                  marginTop: { xs: "50px", md: "50px" },
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                {product.price}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              minHeight: "325px",
            }}
          >
            <Box textAlign={{ xs: "left", md: "left" }}>
              <Typography
                sx={{
                  width: "350px",
                  fontFamily: "Poppins-Regular",
                  color: "#A8A8A8",
                  marginTop: { xs: "10px", md: "40px" },
                  maxHeight: isTextExpanded ? "none" : "150px",
                  overflow: isTextExpanded ? "visible" : "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  WebkitLineClamp: isTextExpanded ? "none" : 4,
                }}
              >
                {isTextExpanded ? product.description : truncatedDescription}
              </Typography>
              {showReadMoreButton && (
                <Button
                  onClick={() => setTextExpanded((prev) => !prev)}
                  sx={{ color: "#A8A8A8", textTransform: "unset", border: "1px solid #A8A8A8", borderRadius: "3px", marginTop: "5px"}}
                >
                  {isTextExpanded ? "Exibir menos" : "Exibir mais"}
                </Button>
              )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "30px",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Typography
                  sx={{
                    width: "40%",
                    backgroundColor: "#A8A8A8",
                    color: "#FFF",
                    textAlign: "center",
                    borderRadius: "3px",
                    padding: "5px",
                  }}
                >
                  {product.categories.name}
                </Typography>
                <Typography
                  sx={{
                    width: "40%",
                    backgroundColor: "#A8A8A8",
                    color: "#FFF",
                    textAlign: "center",
                    borderRadius: "3px",
                    padding: "5px",
                  }}
                >
                  {product.species.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  marginTop: "60px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                }}
              >
                <Button
                  sx={{
                    border: "2px solid #BFBFBF",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                >
                  <FontAwesomeIcon
                    icon={faCartPlus}
                    style={{
                      fontSize: "25px",
                      color:
                        location.pathname === "/cart" ? "#EB389A" : "#BFBFBF",
                    }}
                  />
                </Button>
                <IconButton onClick={decreaseQuantity} disabled={quantity <= 1}>
                  <FontAwesomeIcon icon={faMinus} />
                </IconButton>
                <Typography sx={{fontFamily: "Poppins-Regular", marginTop: "7px", fontSize: "1.2rem"}}>{quantity}</Typography>
                <IconButton onClick={increaseQuantity}>
                  <FontAwesomeIcon icon={faPlus} />
                </IconButton>
              </Box>
              <Box
                sx={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  sx={{
                    width: "100%",
                    backgroundColor: "#EB389A",
                    fontFamily: "Poppins-Bold",
                    color: "#FFF",
                    textTransform: "capitalize",
                    fontSize: "1.2rem",
                  }}
                >
                  Comprar
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ProductDetails;
