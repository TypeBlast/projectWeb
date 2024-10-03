  import React, { useState } from "react";
  import { Typography, Box, Button, Modal } from "@mui/material";
  import axios from "../../../../axios/axios"
  import InputCategory from "../inputs/inputCategories";
  import InputNameProduct from "../inputs/inputNameProducts";
  import InputStock from "../inputs/inputStock";
  import InputURL from "../inputs/inputUrl";
  import InputSpecies from "../inputs/inputSpecies";
  import InputPrice from "../inputs/inputPrices";
  import InputDescription from "../inputs/inputDescriptions";

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "35%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 2,
  };

  function BoxCreateProduct() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [speciesId, setSpeciesId] = useState("");
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [categories, setCategories] = useState([]); // Estado para categorias
    const [species, setSpecies] = useState([]); // Estado para espécies

    const handleOpen = async () => {
      setOpen(true);
      setError("");
      setSuccess("");
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategoryId("");
      setSpeciesId("");
      setUrl("");

      try {
        const [categoriesResponse, speciesResponse] = await Promise.all([
          axios.getAllCategories(), 
          axios.getAllSpecies(), 
        ]);

        setCategories(categoriesResponse.data.data);
        setSpecies(speciesResponse.data.data);
      } catch (err) {
        console.error("Erro ao carregar categorias ou espécies:", err);
        setError("Erro ao carregar categorias ou espécies.");
      }
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleSave = async () => {
      try {
        const productData = {
          name,
          description,
          price,
          stock,
          category_id: categoryId,
          species_id: speciesId,
          url,
          price: parseFloat(price), 
          stock: parseFloat(stock), 
        };

        await axios.createProduct(productData);
        setSuccess("Produto cadastrado com sucesso!");
        handleClose();
        window.location.reload();
      } catch (error) {
        console.error("Erro ao criar produto:", error.response?.data || error.message);
        setError(error.response?.data?.message || "Erro ao criar produto.");
      }
    };

    return (
      <Box>
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
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
          Adicionar Novo Produto
        </Button>

        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <Typography
              sx={{
                fontFamily: "Poppins-Bold",
                fontSize: "1.3rem",
                marginTop: "30px",
                textAlign: "center",
              }}
            >
              Adicionar Produto
            </Typography>
            {error && (
              <Typography sx={{ color: "red", textAlign: "center" }}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography sx={{ color: "green", textAlign: "center" }}>
                {success}
              </Typography>
            )}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
              <InputNameProduct value={name} onChange={(e) => setName(e.target.value)} />
              <InputDescription value={description} onChange={(e) => setDescription(e.target.value)} />
              <InputPrice value={price} onChange={(e) => setPrice(e.target.value)} />
              <InputStock value={stock} onChange={(e) => setStock(e.target.value)} />
              <InputCategory
                categories={categories} // Passando categorias
                selectedCategory={categoryId}
                handleCategoryChange={(e) => setCategoryId(e.target.value)}
              />
              <InputSpecies
                species={species} // Passando espécies
                selectedSpecies={speciesId}
                handleSpeciesChange={(e) => setSpeciesId(e.target.value)}
              />
              <InputURL value={url} onChange={(e) => setUrl(e.target.value)} />
              <Button
                onClick={handleSave}
                variant="contained"
                sx={{
                  backgroundColor: "#EB389A",
                  color: "#FFF",
                  textTransform: "capitalize",
                  fontSize: "1rem",
                  marginTop: "20px",
                  width: "100%",
                  fontFamily: "Poppins-Bold",
                  "&:hover": {
                    backgroundColor: "#D5006D",
                  },
                }}
              >
                Criar Produto
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  }

  export default BoxCreateProduct;
