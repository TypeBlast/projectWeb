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

    return (
      <ThemeProvider theme={theme}>
        <div>
          {pets.data && pets.data.length > 0 ? (
            <Box
              sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
            >
              {pets.data.map((pet, index) => (
                <Button
                  key={pet.id}
                  variant="contained"
                  sx={{
                    backgroundColor: '#8a2be2',
                    '&:hover': {
                      backgroundColor: '#ff4500',
                    },
                    color: 'white',
                    m: 1,
                    minWidth: 120,
                    height: 40,
                    borderRadius: 2
                }}
                >
                  {pet.name}
                </Button>
              ))}
            </Box>
          ) : (
            <Typography variant="body1">Não há pets cadastrados.</Typography>
          )}
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Cadastrar novo Pet
          </Button>
          <Modal
            open={modalIsOpen}
            onClose={handleCloseModal}
          >
            <Box
              sx={{
                p: 2,
                bgcolor: "background.paper",
                borderRadius: 1,
                maxWidth: 400,
                margin: "auto",
                marginTop: "20vh",
              }}
            >
              <Typography variant="h6" gutterBottom>
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
                />
                <Select
                  name="specie"
                  value={newPet.specie}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
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
        </div>
      </ThemeProvider>
    );
  }

  export default Pets;
