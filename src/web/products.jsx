import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import components MUI
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

// Import components
import SearchBar from "../components/layout/searchBar";

// Import fontAwesome
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

  // Produtos fictícios
  const products = [
    {
      id: 1,
      name: "Ração para Cães",
      price: "R$ 79,90",
      image:
        "https://plus.unsplash.com/premium_photo-1683134382202-aac458a92c19?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
      category: "Ração",
      specie: "Dogs",
    },
    {
      id: 2,
      name: "Brinquedo para Gatos",
      price: "R$ 29,90",
      image:
        "https://images.unsplash.com/photo-1585837575652-267c041d77d4?q=80&w=1795&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
      category: "Acessórios",
      specie: "Cats",
    },
    {
      id: 3,
      name: "Cama para Cachorros",
      price: "R$ 199,90",
      image:
        "https://images.unsplash.com/photo-1581888475780-27b6b0bc3690?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
      category: "Acessórios",
      specie: "Dogs",
    },
    {
      id: 4,
      name: "Ração para Cães",
      price: "R$ 79,90",
      image:
        "https://plus.unsplash.com/premium_photo-1683134382202-aac458a92c19?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
      category: "Ração",
      specie: "Dogs",
    },
    {
      id: 5,
      name: "Brinquedo para Gatos",
      price: "R$ 29,90",
      image:
        "https://images.unsplash.com/photo-1585837575652-267c041d77d4?q=80&w=1795&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
      category: "Acessórios",
      specie: "Cats",
    },
    {
      id: 6,
      name: "Cama para Cachorros",
      price: "R$ 199,90",
      image:
        "https://images.unsplash.com/photo-1581888475780-27b6b0bc3690?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
      category: "Acessórios",
      specie: "Dogs",
    },
    {
      id: 7,
      name: "Ração para Cães",
      price: "R$ 79,90",
      image:
        "https://plus.unsplash.com/premium_photo-1683134382202-aac458a92c19?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
      category: "Ração",
      specie: "Dogs",
    },
    {
      id: 8,
      name: "Brinquedo para Gatos",
      price: "R$ 29,90",
      image:
        "https://images.unsplash.com/photo-1585837575652-267c041d77d4?q=80&w=1795&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
      category: "Acessórios",
      specie: "Cats",
    },
    {
      id: 9,
      name: "Cama para Cachorros",
      price: "R$ 199,90",
      image:
        "https://images.unsplash.com/photo-1581888475780-27b6b0bc3690?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
      category: "Acessórios",
      specie: "Dogs",
    },
    {
      id: 10,
      name: "Ração para Cães",
      price: "R$ 79,90",
      image:
        "https://plus.unsplash.com/premium_photo-1683134382202-aac458a92c19?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
      category: "Ração",
      specie: "Dogs",
    },
    {
      id: 11,
      name: "Brinquedo para Gatos",
      price: "R$ 29,90",
      image:
        "https://images.unsplash.com/photo-1585837575652-267c041d77d4?q=80&w=1795&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
      category: "Acessórios",
      specie: "Cats",
    },
    {
      id: 12,
      name: "Cama para Cachorros",
      price: "R$ 199,90",
      image:
        "https://images.unsplash.com/photo-1581888475780-27b6b0bc3690?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
      category: "Acessórios",
      specie: "Dogs",
    },
  ];

  const navigate = useNavigate(); // Hook para navegação

  const handleCardClick = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  return (
    <div className="container" style={{ paddingBottom: "50px" }}>
      <Box sx={{ marginTop: "75px", display: "flex", alignItems: "center" }}>
        <SearchBar />
        <Button sx={{ marginLeft: "3%" }} onClick={handleModalOpen}>
          <FontAwesomeIcon
            icon={faFilter}
            style={{ fontSize: "30px", color: "#BFBFBF" }}
          />
        </Button>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "50px" }}
        justifyContent="center"
      >
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                maxWidth: "250px",
                margin: "auto",
                borderRadius: "10px",
                marginTop: "30px",
                padding: 0,
              }}
            >
              <CardActionArea onClick={() => handleCardClick(product)}>
                <CardMedia
                  component="img"
                  height="150px"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography
                    sx={{
                      fontFamily: "Poppins-Bold",
                      color: "#BFBFBF",
                      fontSize: "1rem",
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins-Bold",
                      color: "#A8A8A8",
                      fontSize: "1.2rem",
                      marginTop: "10px",
                      marginLeft: "125px",
                    }}
                  >
                    {product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

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
