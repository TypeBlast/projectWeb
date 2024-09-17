import React, { useState } from "react";

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

  return (
    <div className="container">
      <Box sx={{ marginTop: "75px", display: "flex", alignItems: "center" }}>
        <SearchBar />
        <Button sx={{ marginLeft: "3%" }} onClick={handleModalOpen}>
          <FontAwesomeIcon
            icon={faFilter}
            style={{ fontSize: "30px", color: "#BFBFBF" }}
          />
        </Button>
      </Box>
      <StyledModal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="menu-modal-title"
        aria-describedby="menu-modal-description"
      >
        <ModalContent>
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
        </ModalContent>
      </StyledModal>
    </div>
  );
}

export default Products;
