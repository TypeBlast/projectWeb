import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Modal,
} from "@mui/material";
import BoxCreateProduct from '../components/layout/boxCreateProducts';
import axios from "../../../axios/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Ícone de deletar

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

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

  const handleDeleteProduct = async () => {
    try {
      if (selectedProductId) {
        await axios.deleteProduct(selectedProductId); // Chame sua API para deletar o produto
        fetchProducts(); // Atualize a lista de produtos após a exclusão
        handleCloseConfirmModal(); // Fecha o modal
      }
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  const handleClickOpen = (productId) => {
    setSelectedProductId(productId);
    setOpenConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
    setSelectedProductId(null); // Limpa o id do produto selecionado
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
                  <Button
                    onClick={() => handleClickOpen(product.id)} // Abre o modal
                    sx={{
                      width: "100%",
                      backgroundColor: "#EB389A",
                      marginTop: "10px",
                      fontFamily: "Poppins-Bold",
                      color: "#FFF",
                      textTransform: "capitalize",
                      fontSize: "1rem",
                      "&:hover": {
                        backgroundColor: "#D5006D",
                      },
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} style={{ marginRight: "5px" }} />
                    Deletar
                  </Button>
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

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        open={openConfirmModal}
        onClose={handleCloseConfirmModal}
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-description"
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            margin: "auto",
            marginTop: "100px",
          }}
        >
          <Typography id="confirm-modal-title" variant="h6" component="h2" sx={{ textAlign: "center", marginBottom: "20px" }}>
            Confirmar Exclusão
          </Typography>
          <Typography sx={{ textAlign: "center", marginBottom: "20px" }}>
            Você tem certeza que deseja excluir este produto?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={handleCloseConfirmModal}
              sx={{
                width: "150px",
                backgroundColor: "#EB389A",
                marginTop: "20px",
                fontFamily: "Poppins-Bold",
                color: "#FFF",
                textTransform: "capitalize",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#D5006D",
                },
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDeleteProduct}
              sx={{
                width: "150px",
                backgroundColor: "#EB389A",
                marginTop: "20px",
                fontFamily: "Poppins-Bold",
                color: "#FFF",
                textTransform: "capitalize",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#D5006D",
                },
              }}
            >
              Confirmar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AdminProducts;
