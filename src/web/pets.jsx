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
  Alert
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

  const [openSnackbar, setOpenSnackbar] = useState(false);

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
    event.preventDefault();
    try {
      await sheets.createPet(newPet);
      setOpenSnackbar(true);
      handleCloseModal();
      fetchPets();
    } catch (error) {
      console.error("Error creating pet:", error);
      alert("Erro ao cadastrar pet. Tente novamente.");
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const colors = ["#BA60E8", "#FF423D"];
  const HOVER_COLOR = "#F25CAE";

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
            <Typography
              sx={{
                fontFamily: "Poppins-Bold",
                fontSize: "1.4rem",
                textTransform: "unset",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Cadastrar Pet
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
                style={{ width: "80%", maxWidth: "500px" }}
              >
                <TextField
                  label="Nome"
                  name="name"
                  value={newPet.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                  variant="standard"
                  sx={{
                    width: "100%",
                    marginTop: "10px",
                    "& label": {
                      color: "#333",
                      fontFamily: "Poppins-Regular",
                    },
                    "& label.Mui-focused": {
                      color: "#A8A8A8",
                    },
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "#D9D9D9",
                      borderBottomWidth: "2px",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#A8A8A8",
                    },
                    "& .MuiInputBase-input": {
                      color: "#333",
                    },
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
                  sx={{
                    width: "100%",
                    marginTop: "5px",
                    "& label": {
                      color: "#333",
                      fontFamily: "Poppins-Regular",
                    },
                    "& label.Mui-focused": {
                      color: "#A8A8A8",
                    },
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "#D9D9D9",
                      borderBottomWidth: "2px",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#A8A8A8",
                    },
                    "& .MuiInputBase-input": {
                      color: "#333",
                    },
                  }}
                />
                <Select
                  name="specie"
                  value={newPet.specie}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{
                    width: "100%",
                    marginTop: "10px",
                    "& .MuiSelect-select": {
                      color: "#333",
                      fontFamily: "Poppins-Regular",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "2px solid #D9D9D9",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#A8A8A8",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#A8A8A8",
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
                  sx={{
                    width: "100%",
                    marginTop: "15px",
                    "& .MuiSelect-select": {
                      color: "#333",
                      fontFamily: "Poppins-Regular",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "2px solid #D9D9D9",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#A8A8A8",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#A8A8A8",
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
                  sx={{
                    marginTop: "25px",
                    backgroundColor: "#EB389A",
                    height: "50px",
                    borderRadius: "5px",
                    fontFamily: "Poppins-Bold",
                    textTransform: "unset",
                    fontSize: "1.2rem",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: "#D72C7A",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  Cadastrar
                </Button>
              </form>
            </Box>
          </Box>
        </Modal>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Pet cadastrado com sucesso!
          </Alert>
        </Snackbar>

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
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: colors[index % colors.length],
                  color: "#FFF",
                  fontFamily: "Poppins-Bold",
                  textTransform: "unset",
                  fontSize: "1.5rem",
                  padding: "10px 50px",
                  marginRight: "30px",
                  height: "200px",
                  width: "300px",
                  borderRadius: "20px",
                  transition: "background-color 0.3s, transform 0.3s",
                  "&:hover": {
                    backgroundColor: HOVER_COLOR,
                    transform: "scale(1.05)",
                  },
                }}
              >
                {pet.name}
              </Box>
            ))}
          </Box>
        ) : (
          <Typography
            sx={{
              fontFamily: "Poppins-Bold",
              fontSize: "1.4rem",
              textTransform: "unset",
              textAlign: "center",
              marginTop: "50px",
              color: "#A8A8A8",
            }}
          >
            Nenhum pet cadastrado.
          </Typography>
        )}
      </div>
    </ThemeProvider>
  );
}

export default Pets;
