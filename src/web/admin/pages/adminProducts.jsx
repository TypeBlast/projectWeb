import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Modal,
} from "@mui/material";
import axios from "../../../axios/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faTrash } from "@fortawesome/free-solid-svg-icons"; 
import BoxCreateProduct from '../components/layout/boxCreateProducts';

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
        await axios.deleteProduct(selectedProductId); 
        fetchProducts(); 
        handleCloseConfirmModal(); 
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
    setSelectedProductId(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: "50px", width: "100%", padding: "0 140px" }}>
        <Typography sx={{ fontFamily: "Poppins-Bold", fontSize: "1.5rem" }}>
          Seus Produtos
        </Typography>
        <BoxCreateProduct />
      </Box>

      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
        <Box sx={{
            border: "1px solid #BFBFBF",
            borderRadius: "10px",
            width: "80%",
            margin: "auto",
            padding: "20px",
            boxShadow: "0px 4px 4px rgba(191, 191, 191, 0.75)"
          }}>
          <Typography variant="h6" sx={{ fontFamily: "Poppins-Bold", marginBottom: "20px" }}>
            Todos os Produtos
          </Typography>

          {/* Cabeçalho */}
          <Grid container sx={{ marginBottom: "10px", borderBottom: "2px solid #000", paddingBottom: "10px" }}>
            <Grid item xs={12} sm={5}>
              <Typography variant="subtitle1" sx={{ fontFamily: "Poppins-Bold" }}>Nome</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle1" sx={{ fontFamily: "Poppins-Bold" }}>Preço</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="subtitle1" sx={{ fontFamily: "Poppins-Bold" }}>Estoque</Typography>
            </Grid>
          </Grid>

          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <Grid container key={product.id} sx={{ marginBottom: "10px", borderBottom: "1px solid #D9D9D9", paddingBottom: "10px" }}>
                <Grid item xs={12} sm={5}>
                  <Typography sx={{ fontFamily: "Poppins-Regular" }}>{product.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography sx={{ fontFamily: "Poppins-Regular", color: "text.secondary" }}>R$ {product.price}</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography sx={{ fontFamily: "Poppins-Regular", color: "text.secondary" }}>{product.stock}</Typography>
                </Grid>
                <Grid item xs={12} sm={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    onClick={() => handleClickOpen(product.id)} 
                    sx={{
                      backgroundColor: "#EB389A",
                      color: "#FFF",
                      textTransform: "capitalize",
                      fontSize: "1rem",
                      "&:hover": {
                        backgroundColor: "#D5006D",
                      },
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} style={{ marginRight: "2px" }} />
                  </Button>
                </Grid>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              Nenhum produto disponível.
            </Typography>
          )}
        </Box>
      </Grid>

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
