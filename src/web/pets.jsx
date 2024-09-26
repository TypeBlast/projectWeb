import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Modal,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import sheets from "../axios/axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

function Pets() {
  const [pets, setPets] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newPet, setNewPet] = useState({
    name: "",
    age: "",
    specie: "Cachorro",
    size: "Médio",
  });

  const species = ["Cachorro", "Gato"];
  const sizes = ["Pequeno", "Médio", "Grande"];

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setNewPet({ name: "", age: "", specie: "Cachorro", size: "Médio" });
  };

  const fetchPets = async () => {
    try {
      const response = await sheets.getAllPets();
      setPets(response.data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleChange = (event) => {
    setNewPet({ ...newPet, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page refresh
    try {
      await sheets.createPet(newPet);
      alert("Pet cadastrado com sucesso!");
      handleCloseModal(); // Close modal on success
      fetchPets(); // Atualizar a lista de pets após o cadastro
    } catch (error) {
      console.error("Error creating pet:", error);
      alert("Erro ao cadastrar pet. Tente novamente.");
    }
  };

  const colors = ["#BA60E8", "#FF423D"];
  const HOVER_COLOR = "#F25CAE"; // Cor de hover

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
            marginLeft: "75px",
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
              maxWidth: "400px",
              width: "35%",
              margin: "auto",
              marginTop: "20vh",
            }}
          >
            <Typography sx={{ fontFamily: "Poppins-Bold", fontSize: "1.4rem", textTransform: "unset", textAlign: "center" }}>
              Cadastrar Pet
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Nome"
                name="name"
                value={newPet.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                variant="standard"
                sx={{
                  margin: "2px",
                  '& label': {
                    color: '#D9D9D9',
                  },
                  '& label.Mui-focused': {
                    color: '#A8A8A8',
                  },
                  '& .MuiInput-underline:before': {
                    borderBottomColor: '#D9D9D9',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#A8A8A8',
                  },
                  '& .MuiInputBase-input': {
                    color: '#333',
                  },
                  fontFamily: "Poppins-Regular"
                }}
              />
              <TextField
                label="Idade"
                type="number"
                name="age"
                value={newPet.age}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                variant="standard"
                sx={{
                  margin: "2px",
                  '& label': {
                    color: '#D9D9D9',
                  },
                  '& label.Mui-focused': {
                    color: '#A8A8A8',
                  },
                  '& .MuiInput-underline:before': {
                    borderBottomColor: '#D9D9D9',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#A8A8A8',
                  },
                  '& .MuiInputBase-input': {
                    color: '#333',
                  },
                  fontFamily: "Poppins-Regular"
                }}
              />
              <Select
                name="specie"
                value={newPet.specie}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                sx={{
                  margin: "2px",
                  '& .MuiSelect-select': {
                    color: '#333',
                  },
                  '& .MuiInputBase-root:before': {
                    borderBottomColor: '#D9D9D9',
                  },
                  '& .MuiInputBase-root:after': {
                    borderBottomColor: '#A8A8A8',
                  },
                  '&:hover .MuiInputBase-root:before': {
                    borderBottomColor: '#D9D9D9',
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
                fullWidth
                margin="normal"
                required
                sx={{
                  margin: "2px",
                  '& .MuiSelect-select': {
                    color: '#333',
                  },
                  '& .MuiInputBase-root:before': {
                    borderBottomColor: '#D9D9D9',
                  },
                  '& .MuiInputBase-root:after': {
                    borderBottomColor: '#A8A8A8',
                  },
                  '&:hover .MuiInputBase-root:before': {
                    borderBottomColor: '#D9D9D9',
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
                color="primary"
                fullWidth
              >
                Cadastrar
              </Button>
            </form>
          </Box>
        </Modal>
        {pets.data && pets.data.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              whiteSpace: "nowrap",
              justifyContent: "flex-start",
              p: 1,
              marginLeft: "55px",
              marginTop: "50px",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#E01483",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#C01374",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#F1F1F1",
              },
            }}
          >
            {pets.data.map((pet, index) => (
              <Button
                key={pet.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? colors[0] : colors[1],
                  minWidth: "500px",
                  width: "45%",
                  minHeight: "200px",
                  "&:hover": {
                    backgroundColor: HOVER_COLOR,
                  },
                  color: "white",
                  m: 1,
                  borderRadius: 2,
                }}
              >
                {pet.name}
              </Button>
            ))}
          </Box>
        ) : (
          <Typography variant="body1">Não há pets cadastrados.</Typography>
        )}
      </div>
    </ThemeProvider>
  );
}

export default Pets;
