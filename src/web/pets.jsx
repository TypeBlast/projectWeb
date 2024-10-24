import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Modal,
  TextField,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import sheets from "../axios/axios";

const theme = createTheme();

const BoxPetData = ({ pet, onPetClick, onDelete }) => {
  const colors = ["#BA60E8", "#FF423D"];
  const HOVER_COLOR = "#F25CAE";

  return (
    <Box
      onClick={() => onPetClick(pet)} // Chama a função de clique no pet
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        color: "#FFF",
        fontFamily: "Poppins-Bold",
        textTransform: "unset",
        fontSize: "1.5rem",
        padding: "10px 30px",
        marginRight: "30px",
        height: "200px",
        width: "300px",
        borderRadius: "20px",
        transition: "background-color 0.3s, transform 0.3s",
        "&:hover": {
          backgroundColor: HOVER_COLOR,
          transform: "scale(1.05)",
          cursor: "pointer", // Muda o cursor para indicar que é clicável
        },
      }}
    >
      <span>{pet.name}</span>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onDelete(pet.id);
        }} // Previne a propagação do clique
        sx={{
          color: "#FFF",
          "&:hover": { color: "#FF423D" },
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

function Pets() {
  const [pets, setPets] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newPet, setNewPet] = useState({
    name: "",
    age: "",
    specie: "Cachorro",
    size: "Médio",
  });
  const [selectedPet, setSelectedPet] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
  const species = ["Cachorro", "Gato"];
  const sizes = ["Pequeno", "Médio", "Grande"];

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setNewPet({ name: "", age: "", specie: "Cachorro", size: "Médio" });
    setSelectedPet(null); // Limpa o pet selecionado ao fechar
  };

  const fetchPets = async () => {
    try {
      const response = await sheets.getPetByUser();
      if (response.data && Array.isArray(response.data.data)) {
        setPets(response.data.data);
      } else {
        setPets([]);
      }
    } catch (error) {
      console.error("Error fetching pets:", error);
      setPets([]);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleChange = (event) => {
    setNewPet({ ...newPet, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (selectedPet) {
        // Se um pet estiver selecionado, atualiza
        await sheets.updatePet(selectedPet.id, newPet);
      } else {
        // Caso contrário, cria um novo pet
        await sheets.createPet(newPet);
      }
      setOpenSnackbar(true);
      handleCloseModal();
      fetchPets();
    } catch (error) {
      console.error("Error saving pet:", error);
      alert(
        error.response?.data?.message || "Erro ao salvar pet. Tente novamente."
      );
    }
  };

  const handleDeletePet = async (id) => {
    try {
      await sheets.deletePet(id);
      setOpenDeleteSnackbar(true);
      fetchPets();
    } catch (error) {
      console.error("Erro ao deletar pet:", error);
      alert("Erro ao deletar pet. Tente novamente.");
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setOpenDeleteSnackbar(false);
  };

  const handlePetClick = (pet) => {
    setSelectedPet(pet);
    setNewPet({
      name: pet.name,
      age: pet.age,
      specie: pet.specie,
      size: pet.size,
    });
    handleOpenModal(); // Abre o modal com os dados do pet
  };

  const handleClosePetDetails = () => {
    setSelectedPet(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button
          sx={{
            backgroundColor: "#EB389A",
            color: "#FFF",
            fontFamily: "Poppins-Bold",
            textTransform: "unset",
            fontSize: "1.2rem",
            padding: "10px 50px",
            marginLeft: "7%",
            marginRight: "2%",
            marginTop: "50px",
            transition: "background-color 0.3s, transform 0.3s",
            "&:hover": {
              backgroundColor: "#D72C7A",
              transform: "scale(1.05)",
            },
          }}
          onClick={handleOpenModal}
        >
          Cadastrar novo Pet
        </Button>

        <Modal open={modalIsOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              p: 2,
              bgcolor: "background.paper",
              borderRadius: "10px",
              minWidth: "300px",
              width: "40%",
              margin: "auto",
              marginTop: "20vh",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins-Bold",
                fontSize: "1.4rem",
                textTransform: "unset",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              {selectedPet ? "Atualizar Pet" : "Cadastrar Pet"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // Centraliza o conteúdo horizontalmente
                  justifyContent: "center", // Centraliza verticalmente
                  width: "100%",
                }}
              >
                <TextField
                  label="Nome"
                  name="name"
                  value={newPet.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                  variant="standard"
                  sx={{ width: "80%" }}
                  InputLabelProps={{
                    sx: { fontFamily: "Poppins-Regular", fontSize: "1rem" }, // Fonte para o label
                  }}
                  InputProps={{
                    sx: { fontFamily: "Poppins-Regular", fontSize: "1rem" }, // Fonte para o input
                  }}
                />
                <TextField
                  label="Idade"
                  type="number"
                  name="age"
                  value={newPet.age}
                  onChange={handleChange}
                  margin="normal"
                  required
                  variant="standard"
                  sx={{ width: "80%" }}
                  InputLabelProps={{
                    sx: { fontFamily: "Poppins-Regular", fontSize: "1rem" }, // Fonte para o label
                  }}
                  InputProps={{
                    sx: { fontFamily: "Poppins-Regular", fontSize: "1rem" }, // Fonte para o input
                  }}
                />
                <Select
                  name="specie"
                  value={newPet.specie}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{ width: "80%", marginTop: "15px" }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        fontFamily: "Poppins-Regular", // Fonte para as opções do Select
                      },
                    },
                  }}
                >
                  {species.map((specie) => (
                    <MenuItem key={specie} value={specie}>
                      {specie}
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  name="size"
                  value={newPet.size}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{ width: "80%", marginTop: "15px" }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        fontFamily: "Poppins-Regular", // Fonte para as opções do Select
                      },
                    },
                  }}
                >
                  {sizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#EB389A",
                    color: "#FFF",
                    width: "80%",
                    maxWidth: "300px",
                    alignSelf: "center",
                    marginTop: "20px",
                    textTransform: "unset",
                    fontFamily: "Poppins-Bold",
                    fontSize: "1.1rem",
                    "&:hover": {
                      backgroundColor: "#D72C7A",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  {selectedPet ? "Atualizar Pet" : "Adicionar Pet"}
                </Button>
              </form>
            </Box>
          </Box>
        </Modal>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            {selectedPet
              ? "Pet atualizado com sucesso!"
              : "Pet cadastrado com sucesso!"}
          </Alert>
        </Snackbar>

        {/* Snackbar para deletar */}
        <Snackbar
          open={openDeleteSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            Pet deletado com sucesso!
          </Alert>
        </Snackbar>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "30px",
            padding: "10px",
            overflowY: "auto", // Permite rolagem vertical

            "&::-webkit-scrollbar": {
              width: "8px", // Largura da barra de rolagem
            },
            "&::-webkit-scrollbar-track": {
              background: "#F1F1F1", // Cor do fundo da barra de rolagem
              borderRadius: "10px", // Bordas arredondadas da trilha
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#EB389A", // Cor da parte da barra de rolagem
              borderRadius: "10px", // Bordas arredondadas do polegar
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#C01374", // Cor do polegar ao passar o mouse
            },
          }}
        >
          {pets.map((pet) => (
            <BoxPetData
              key={pet.id}
              pet={pet}
              onPetClick={handlePetClick}
              onDelete={handleDeletePet}
            />
          ))}
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default Pets;
