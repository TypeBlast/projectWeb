import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios/axios";
import {
  Typography,
  Button,
  Box,
  Modal,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { styled } from "@mui/system";
import SearchBar from "../components/layout/searchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "start",
  justifyContent: "end",
});

const ModalContent = styled(Box)({
  backgroundColor: "white",
  padding: "20px",
  outline: "none",
  width: "100%",
  maxWidth: "400px",
  height: "100%",
  borderRadius: 7,
});

function Products() {
  const [open, setOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategories, setSelectedCategories] = useState({
    saude: false,
    petiscos: false,
    acessorios: false,
    higieneBeleza: false,
    racoes: false,
  });
  const [selectedSpecies, setSelectedSpecies] = useState({
    dogs: false,
    cats: false,
    birds: false,
    fish: false,
    rabbits: false,
    hamster: false,
    reptile: false,
  });
  const [products, setProducts] = useState([]);

  const { category_id } = useParams(); // Captura o category_id da URL
  const { specie_id } = useParams(); // Captura o specie_id da URL
  const navigate = useNavigate(); // Hook para navegação

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategories({
      ...selectedCategories,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSpeciesChange = (event) => {
    setSelectedSpecies({
      ...selectedSpecies,
      [event.target.name]: event.target.checked,
    });
  };

  const handleClear = () => {
    setSortOrder(""); // Limpar o select
    setSelectedCategories({
      saude: false,
      petiscos: false,
      acessorios: false,
      higieneBeleza: false,
      racoes: false,
    });
    setSelectedSpecies({
      dogs: false,
      cats: false,
      birds: false,
      fish: false,
      rabbits: false,
      hamster: false,
      reptile: false,
    }); // Limpar os checkboxes
  };

  // Busca produtos da API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (category_id) {
          response = await axios.getProductsByCategory(category_id); // Chamada correta da função
        } else if (specie_id) {
          response = await axios.getProductsBySpecie(specie_id);
        } else {
          response = await axios.getAllProducts(); // Pega todos os produtos se não houver filtro
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
        // Verifica se o campo de pesquisa não está vazio (ou apenas espaços)
        const response = await axios.getProductsByName(name);
        const productsData = response.data.data;
        setProducts(productsData); // Atualiza os produtos com os resultados da pesquisa
      } else {
        // Se o campo de pesquisa estiver vazio, busca todos os produtos
        const response = await axios.getAllProducts("/api/products");
        const allProductsData = response.data.data;
        setProducts(allProductsData); // Exibe todos os produtos
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setProducts([]); // Define produtos como vazio se houver erro
    }
  };

  return (
    <div className="container" style={{ paddingBottom: "50px" }}>
      <Box sx={{ marginTop: "75px", display: "flex", alignItems: "center" }}>
        <SearchBar onSearch={handleSearch} />
        <Button sx={{ marginLeft: "3%" }} onClick={handleModalOpen}>
          <FontAwesomeIcon
            icon={faFilter}
            style={{ fontSize: "30px", color: "#BFBFBF" }}
          />
        </Button>
      </Box>
      {Array.isArray(products) && products.length > 0 ? (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={product.id}
              sx={{ marginTop: "25px" }}
            >
              <Card
                sx={{
                  width: "300px",
                  margin: "auto",
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between", // Para garantir que o conteúdo ocupe o mesmo espaço
                  height: "100%", // Faz o card ocupar todo o espaço disponível
                }}
                onClick={() => handleCardClick(product)}
              >
                <CardActionArea sx={{ flexGrow: 1 }}>
                  <CardMedia
                    component="img"
                    image={product.url}
                    alt={product.name}
                    sx={{ height: "200px", objectFit: "cover" }} // Define a altura da imagem
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
                        sx={{ fontFamily: "Poppins-Bold", color: "#A8A8A8", fontSize: "1.2rem" }}
                      >
                        R$ {product.price}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary">
          Nenhum produto disponível.
        </Typography>
      )}

      <StyledModal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="menu-modal-title"
        aria-describedby="menu-modal-description"
      >
        <ModalContent>
          <Box
            sx={{
              maxHeight: "90vh", // Altura máxima do conteúdo
              overflowY: "auto", // Ativa a rolagem vertical
              paddingRight: "15px",
              /* Estilização da barra de rolagem */
              "&::-webkit-scrollbar": {
                width: "8px", // Largura da barra de rolagem
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#E01483", // Cor do "polegar" da barra de rolagem
                borderRadius: "10px", // Borda arredondada
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#C01374", // Cor ao passar o mouse sobre o "polegar"
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#F1F1F1", // Cor do fundo da barra de rolagem
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins-Bold",
                color: "#000",
                fontSize: "1.2rem",
                marginTop: "20px",
                marginLeft: "10px",
              }}
            >
              Refine para uma busca mais precisa!
            </Typography>

            {/* Ordenar por preço */}
            <FormControl
              fullWidth
              sx={{
                marginTop: "30px",
                marginLeft: "10px",
                width: "300px",
                border: "1px solid #BFBFBF",
                borderRadius: "10px",
              }}
            >
              <InputLabel id="sort-label">Ordenar por</InputLabel>
              <Select
                labelId="sort-label"
                value={sortOrder}
                label="Ordenar por"
                onChange={handleSortChange}
              >
                <MenuItem value="cheapest">Mais baratos</MenuItem>
                <MenuItem value="mostExpensive">Mais caros</MenuItem>
              </Select>
            </FormControl>

            {/* Categorias */}
            <Typography
              sx={{
                marginLeft: "10px",
                marginTop: "20px",
                fontFamily: "Poppins-Bold",
              }}
            >
              Categorias
            </Typography>
            <FormGroup sx={{ marginTop: "10px", marginLeft: "10px" }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedCategories.saude}
                        onChange={handleCategoryChange}
                        name="saude"
                        sx={{
                          "&.Mui-checked": {
                            color: "#E01483", // Cor do checkbox quando marcado
                          },
                        }}
                      />
                    }
                    label="Saúde"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontFamily: "Poppins-Regular",
                        fontSize: "1rem",
                        color: "#000",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedCategories.petiscos}
                        onChange={handleCategoryChange}
                        name="petiscos"
                        sx={{
                          "&.Mui-checked": {
                            color: "#E01483", // Cor do checkbox quando marcado
                          },
                        }}
                      />
                    }
                    label="Petiscos"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontFamily: "Poppins-Regular",
                        fontSize: "1rem",
                        color: "#000",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedCategories.acessorios}
                        onChange={handleCategoryChange}
                        name="acessorios"
                        sx={{
                          "&.Mui-checked": {
                            color: "#E01483", // Cor do checkbox quando marcado
                          },
                        }}
                      />
                    }
                    label="Acessórios"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontFamily: "Poppins-Regular",
                        fontSize: "1rem",
                        color: "#000",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedCategories.higieneBeleza}
                        onChange={handleCategoryChange}
                        name="higieneBeleza"
                        sx={{
                          "&.Mui-checked": {
                            color: "#E01483", // Cor do checkbox quando marcado
                          },
                        }}
                      />
                    }
                    label="Higiene e Beleza"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontFamily: "Poppins-Regular",
                        fontSize: "1rem",
                        color: "#000",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedCategories.racoes}
                        onChange={handleCategoryChange}
                        name="racoes"
                        sx={{
                          "&.Mui-checked": {
                            color: "#E01483", // Cor do checkbox quando marcado
                          },
                        }}
                      />
                    }
                    label="Rações"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontFamily: "Poppins-Regular",
                        fontSize: "1rem",
                        color: "#000",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </FormGroup>

            {/* Espécies */}
            <Typography
              sx={{
                marginLeft: "10px",
                marginTop: "20px",
                fontFamily: "Poppins-Bold",
              }}
            >
              Espécies
            </Typography>
            <FormGroup sx={{ marginTop: "10px", marginLeft: "10px" }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedSpecies.dogs}
                        onChange={handleSpeciesChange}
                        name="dogs"
                        sx={{
                          "&.Mui-checked": {
                            color: "#E01483", // Cor do checkbox quando marcado
                          },
                        }}
                      />
                    }
                    label="Cachorros"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontFamily: "Poppins-Regular",
                        fontSize: "1rem",
                        color: "#000",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedSpecies.cats}
                        onChange={handleSpeciesChange}
                        name="cats"
                        sx={{
                          "&.Mui-checked": {
                            color: "#E01483", // Cor do checkbox quando marcado
                          },
                        }}
                      />
                    }
                    label="Gatos"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontFamily: "Poppins-Regular",
                        fontSize: "1rem",
                        color: "#000",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedSpecies.birds}
                        onChange={handleSpeciesChange}
                        name="birds"
                        sx={{
                          "&.Mui-checked": {
                            color: "#E01483", // Cor do checkbox quando marcado
                          },
                        }}
                      />
                    }
                    label="Pássaros"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontFamily: "Poppins-Regular",
                        fontSize: "1rem",
                        color: "#000",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedSpecies.fish}
                        onChange={handleSpeciesChange}
                        name="fish"
                        sx={{
                          "&.Mui-checked": {
                            color: "#E01483", // Cor do checkbox quando marcado
                          },
                        }}
                      />
                    }
                    label="Peixes"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontFamily: "Poppins-Regular",
                        fontSize: "1rem",
                        color: "#000",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedSpecies.rabbits}
                        onChange={handleSpeciesChange}
                        name="rabbits"
                        sx={{
                          "&.Mui-checked": {
                            color: "#E01483", // Cor do checkbox quando marcado
                          },
                        }}
                      />
                    }
                    label="Coelhos"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontFamily: "Poppins-Regular",
                        fontSize: "1rem",
                        color: "#000",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedSpecies.hamster}
                        onChange={handleSpeciesChange}
                        name="hamster"
                        sx={{
                          "&.Mui-checked": {
                            color: "#E01483", // Cor do checkbox quando marcado
                          },
                        }}
                      />
                    }
                    label="Hamsters"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontFamily: "Poppins-Regular",
                        fontSize: "1rem",
                        color: "#000",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedSpecies.reptile}
                        onChange={handleSpeciesChange}
                        name="reptile"
                        sx={{
                          "&.Mui-checked": {
                            color: "#E01483", // Cor do checkbox quando marcado
                          },
                        }}
                      />
                    }
                    label="Répteis"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontFamily: "Poppins-Regular",
                        fontSize: "1rem",
                        color: "#000",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </FormGroup>
            <Box
              sx={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                gap: "25px",
              }}
            >
              <Button
                sx={{
                  width: "40%",
                  border: "2px solid #E01483",
                  borderRadius: "5px",
                  fontFamily: "Poppins-Bold",
                  color: "#E01483",
                  textTransform: "capitalize",
                }}
                onClick={handleClear}
              >
                Limpar Filtros
              </Button>
              <Button
                sx={{
                  width: "40%",
                  backgroundColor: "#E01483",
                  borderRadius: "5px",
                  fontFamily: "Poppins-Bold",
                  color: "#FFF",
                  textTransform: "capitalize",
                }}
              >
                Filtrar
              </Button>
            </Box>
          </Box>
        </ModalContent>
      </StyledModal>
    </div>
  );
}

export default Products;
