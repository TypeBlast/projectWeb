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
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import BoxCreateProduct from "../components/layout/boxCreateProducts";
import InputCategory from "../components/inputs/inputCategories";
import InputNameProduct from "../components/inputs/inputNameProducts";
import InputStock from "../components/inputs/inputStock";
import InputPrice from "../components/inputs/inputPrices";
import InputURL from "../components/inputs/inputUrl";
import InputSpecies from "../components/inputs/inputSpecies";
import InputDescription from "../components/inputs/inputDescriptions";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [species, setSpecies] = useState([]); 
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: '',
    speciesId: '',
    url: ''
  });

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

  const fetchCategories = async () => {
    try {
      const response = await axios.getAllCategories(); 
      setCategories(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  const fetchSpecies = async () => {
    try {
      const response = await axios.getAllSpecies(); 
      setSpecies(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar espécies:", error);
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

  const handleEditProduct = (product) => {
    setSelectedProduct({ ...product });
    setSelectedProductId(product.id); 
    setOpenEditModal(true);
  };

  const handleClickOpenConfirm = (productId) => {
    setSelectedProductId(productId);
    setOpenConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
    setSelectedProductId(null);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedProduct({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      categoryId: '',
      speciesId: '',
      url: ''
    });
  };

  const handleUpdateProduct = async () => {
    try {
      await axios.updateProduct(selectedProductId, selectedProduct); 
      fetchProducts();
      handleCloseEditModal(); 
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories(); 
    fetchSpecies(); 
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "50px", paddingRight: "140px" }}>
        <Typography sx={{ marginLeft: "140px", fontFamily: "Poppins-Bold", fontSize: "1.5rem" }}>Produtos Administrativos</Typography>
        <BoxCreateProduct />
      </Box>

      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
        <Box
          sx={{
            border: "1px solid #BFBFBF",
            borderRadius: "10px",
            width: "80%",
            margin: "auto",
            padding: "20px",
            boxShadow: "0px 4px 4px rgba(191, 191, 191, 0.75)",
          }}
        >
          <Typography variant="h6" sx={{ fontFamily: "Poppins-Bold", marginBottom: "20px" }}>Todos os Produtos</Typography>

          <Grid container sx={{ marginBottom: "10px", borderBottom: "2px solid #000", paddingBottom: "10px" }}>
            <Grid item xs={12} sm={5}>
              <Typography variant="subtitle1" sx={{ fontFamily: "Poppins-Bold" }}>Nome</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="subtitle1" sx={{ fontFamily: "Poppins-Bold" }}>Preço</Typography>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Typography variant="subtitle1" sx={{ fontFamily: "Poppins-Bold" }}>Estoque</Typography>
            </Grid>
          </Grid>

          {products.length > 0 ? (
            products.map((product) => (
              <Grid container key={product.id} sx={{ marginBottom: "10px", borderBottom: "1px solid #D9D9D9", paddingBottom: "10px" }}>
                <Grid item xs={12} sm={5}>
                  <Typography sx={{ fontFamily: "Poppins-Regular" }}>{product.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography sx={{ fontFamily: "Poppins-Regular", color: "text.secondary" }}>{product.price}</Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                  <Typography sx={{ fontFamily: "Poppins-Regular", color: "text.secondary" }}>{product.stock}</Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button onClick={() => handleEditProduct(product)} sx={{ backgroundColor: "#EB389A", color: "#FFF", textTransform: "capitalize", fontSize: "1rem", "&:hover": { backgroundColor: "#D5006D" } }}>
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                  <Button onClick={() => handleClickOpenConfirm(product.id)} sx={{ backgroundColor: "#EB389A", color: "#FFF", textTransform: "capitalize", fontSize: "1rem", marginLeft: "10px", "&:hover": { backgroundColor: "#D5006D" } }}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </Grid>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">Nenhum produto disponível.</Typography>
          )}
        </Box>
      </Grid>

      {/* Modal de Edição de Produto */}
      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "35%",
          bgcolor: "background.paper",
          borderRadius: "10px",
          boxShadow: 24,
          p: 2,
        }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <Typography variant="h6" component="h2" sx={{ textAlign: "center", marginBottom: "20px" }}>Editar Produto</Typography>
            <InputNameProduct value={selectedProduct.name} onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })} />
            <InputDescription value={selectedProduct.description} onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })} />
            <InputPrice value={selectedProduct.price} onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })} />
            <InputStock value={selectedProduct.stock} onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: e.target.value })} />
            <InputCategory
              value={selectedProduct.categoryId}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, categoryId: e.target.value })}
              categories={categories} 
            />
            <InputSpecies
              value={selectedProduct.speciesId}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, speciesId: e.target.value })}
              species={species} 
            />
            <InputURL value={selectedProduct.url} onChange={(e) => setSelectedProduct({ ...selectedProduct, url: e.target.value })} />

            <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "20px",alignItems:"center" }}>
              <Button onClick={handleUpdateProduct} sx={{ backgroundColor: "#EB389A", fontFamily: "Poppins-Bold", color: "#FFF", textTransform: "capitalize", fontSize: "1rem", "&:hover": { backgroundColor: "#D5006D" } }}>
                Atualizar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal open={openConfirmModal} onClose={handleCloseConfirmModal}>
        <Box sx={{ width: 400, bgcolor: "background.paper", borderRadius: "8px", boxShadow: 24, p: 4, margin: "auto", marginTop: "100px" }}>
          <Typography variant="h6" component="h2" sx={{ textAlign: "center", marginBottom: "20px" }}>Confirmar Exclusão</Typography>
          <Typography variant="body1" sx={{ textAlign: "center", marginBottom: "20px" }}>Tem certeza que deseja excluir este produto?</Typography>
          
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "20px" }}>
          <Button onClick={handleCloseConfirmModal} sx={{ width: "250px",
                backgroundColor: "#EB389A",
                marginTop: "20px",
                fontFamily: "Poppins-Bold",
                color: "#FFF",
                textTransform: "capitalize",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#D5006D",} }}>
              Cancelar
            </Button>
            <Button onClick={handleDeleteProduct} sx={{ width: "250px",
                backgroundColor: "#EB389A",
                marginTop: "20px",
                fontFamily: "Poppins-Bold",
                color: "#FFF",
                textTransform: "capitalize",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#D5006D",} }}>
              Confirmar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AdminProducts;
