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

  const [isTextExpanded, setTextExpanded] = useState(false); // Estado para controlar a expansão do texto
  const [isAddingToCart, setIsAddingToCart] = useState(false); // Estado para controlar o botão de adicionar ao carrinho
  const [quantity, setQuantity] = useState(1); // Estado para controlar a quantidade de produtos

  if (!product || product.id !== parseInt(id)) {
    return <div>Produto não encontrado</div>;
  }

  const truncatedDescription =
    product.description.length > 200
      ? `${product.description.substring(0, 200)}...`
      : product.description;

  const showReadMoreButton = product.description.length > 200; // Verifica se a descrição excede o limite

  // Função para adicionar produto ao carrinho
  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      const itemToAdd = {
        productId: product.id,
        quantity, // Envia a quantidade selecionada
      };
      const response = await axios.addToCart(itemToAdd);
      alert(response.data.message); // Exibe a mensagem da API no alert
    } catch (error) {
      console.error("Erro ao adicionar produto ao carrinho:", error.response.data.message);
      alert(error.response.data.message);
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Funções para aumentar ou diminuir a quantidade de produtos
  const increaseQuantity = () => setQuantity((prevQuantity) => prevQuantity + 1);
  const decreaseQuantity = () => setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="95vh">
      <Box
        width="80%"
        maxWidth="900px"
        border="3px solid #BFBFBF"
        borderRadius="15px"
        minHeight="450px"
        paddingBottom="10px"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              display={{ xs: "flex", md: "block" }}
              justifyContent={{ xs: "center", md: "flex-start" }}
              alignItems="center"
              minHeight="325px" // Altura mínima para alinhar
            >
              <img
                src={product.url}
                style={{
                  width: "100%",
                  borderTopLeftRadius: "15px",
                  height: "325px",
                  display: { xs: "none", md: "block" }, // Exibir imagem apenas em telas grandes
                }}
              />
            </Box>
            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
                marginTop: "25px",
                paddingBottom: "25px",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins-Bold",
                  fontSize: "1.3rem",
                  marginLeft: { xs: 0, md: "25px" },
                  textAlign: { xs: "center", md: "left" },
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
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: "flex-start", // Alinhar o conteúdo para cima
              flexDirection: "column", // Para alinhar os itens em coluna
              minHeight: "325px", // Altura mínima
            }}
          >
            <Box textAlign={{ xs: "center", md: "left" }}>
              <Typography
                sx={{
                  width: "350px",
                  fontFamily: "Poppins-Regular",
                  color: "#A8A8A8",
                  marginTop: { xs: "25px", md: "75px" },
                  maxHeight: isTextExpanded ? "none" : "200px", // Remove a altura máxima se expandido
                  overflow: isTextExpanded ? "visible" : "hidden", // Exibe ou oculta o texto
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  WebkitLineClamp: isTextExpanded ? "none" : 5, // Limitar o número de linhas se não expandido
                }}
              >
                {isTextExpanded ? product.description : truncatedDescription}
              </Typography>
              {showReadMoreButton && ( // Exibe o botão apenas se a descrição exceder 200 caracteres
                <Button
                  onClick={() => setTextExpanded((prev) => !prev)} // Alterna o estado
                  sx={{ marginTop: "10px", color: "#EB389A" }}
                >
                  {isTextExpanded ? "Menos" : "Mais"}
                </Button>
              )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "50px",
                  justifyContent: "center",
                  marginTop: "50px",
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
                  {product.category}
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
                  {product.specie}
                </Typography>
              </Box>
              <Box
                sx={{
                  marginTop: { xs: "50px", md: "165px" },
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                }}
              >
                <Button
                  sx={{
                    width: "70%",
                    backgroundColor: "#EB389A",
                    fontFamily: "Poppins-Bold",
                    color: "#FFF",
                    textTransform: "capitalize",
                    fontSize: "1.2rem",
                  }}
                >
                  Comprar
                </Button>
                <Button
                  sx={{
                    border: "2px solid #BFBFBF",
                    borderRadius: "5px",
                  }}
                  onClick={handleAddToCart} // Chama a função ao clicar no botão
                  disabled={isAddingToCart} // Desabilita o botão enquanto está adicionando ao carrinho
                >
                  <FontAwesomeIcon
                    icon={faCartPlus}
                    style={{
                      fontSize: "25px",
                      color: location.pathname === "/cart" ? "#EB389A" : "#BFBFBF",
                    }}
                  />
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "15px",
                  marginTop: "15px",
                }}
              >
                <IconButton onClick={decreaseQuantity} disabled={quantity <= 1}>
                  <FontAwesomeIcon icon={faMinus} />
                </IconButton>
                <Typography>{quantity}</Typography>
                <IconButton onClick={increaseQuantity}>
                  <FontAwesomeIcon icon={faPlus} />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ProductDetails;
