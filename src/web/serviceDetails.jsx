import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import sheets from "../axios/axios";
import {
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronDown } from "@fortawesome/free-solid-svg-icons";

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState("");
  const [employers, setEmployers] = useState([]);
  const [selectedEmployer, setSelectedEmployer] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await sheets.getServiceById(id);
        setService(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar detalhes do serviço", error);
        setLoading(false);
      }
    };

    const fetchPets = async () => {
      try {
        const response = await sheets.getPetByUser();
        setPets(response.data);
      } catch (error) {
        console.error("Erro ao buscar pets", error);
      }
    };

    const fetchEmployers = async () => {
      try {
        const response = await sheets.getEmployersByServiceId(id);
        setEmployers(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar funcionários", error);
      }
    };

    const generateAvailableTimes = () => {
      const times = [];
      for (let hour = 8; hour < 18; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const time = `${String(hour).padStart(2, "0")}:${String(
            minute
          ).padStart(2, "0")}`;
          times.push(time);
        }
      }
      setAvailableTimes(times);
    };

    fetchService();
    fetchPets();
    fetchEmployers();
    generateAvailableTimes();
  }, [id]);

  const handlePetChange = (event) => {
    setSelectedPet(event.target.value);
  };

  const handleEmployerChange = (event) => {
    setSelectedEmployer(event.target.value);
  };

  const handleDateChange = (event) => {
    setAppointmentDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setAppointmentTime(event.target.value);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleScheduleAppointment = async () => {
    const appointment = {
      service_id: service.id,
      employer_id: selectedEmployer,
      pet_id: selectedPet,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
    };

    try {
      const response = await sheets.createAppointment(appointment);
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/user");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data) {
        setSnackbarMessage(error.response.data.message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage("Erro ao agendar a consulta.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!service) {
    return <p>Serviço não encontrado</p>;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="95vh"
      minWidth="300px"
    >
      <Box
        width="80%"
        minWidth="300px"
        maxWidth="900px"
        border="3px solid #BFBFBF"
        borderRadius="15px"
        minHeight="450px"
        paddingBottom="10px"
        boxShadow={3}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems={{ xs: "center", md: "flex-start" }}
              minHeight="325px"
              padding={{ xs: "20px", md: "50px" }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Poppins-Bold",
                  marginBottom: "20px",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                {service.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins-Regular",
                  color: "#A8A8A8",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                {service.description}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100%"
              marginTop={{ xs: "20px", md: "50px" }} // Ajusta o margin top em telas pequenas
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center" // Centraliza em telas pequenas
                width="90%"
              >
                <FormControl
                  fullWidth
                  margin="normal"
                  style={{ border: "1px solid #BFBFBF", borderRadius: "5px" }}
                  sx={{
                    maxWidth: "500px",
                    margin: "0 auto", // Centraliza o FormControl
                  }}
                >
                  <InputLabel
                    id="pet-select-label"
                    sx={{ color: "#A8A8A8", fontFamily: "Poppins-Regular" }}
                  >
                    Pet
                  </InputLabel>
                  <Select
                    labelId="pet-select-label"
                    id="pet-select"
                    value={selectedPet}
                    onChange={handlePetChange}
                    IconComponent={() => (
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{
                          marginRight: "20px",
                          fontSize: "1.2rem",
                          color: "#BFBFBF",
                        }}
                      />
                    )}
                    label="Selecione um Pet"
                  >
                    {pets.data && pets.data.length > 0 ? (
                      pets.data.map((pet) => (
                        <MenuItem
                          key={pet.id}
                          value={pet.id}
                          sx={{ fontFamily: "Poppins-Regular" }}
                        >
                          {pet.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem
                        value=""
                        disabled
                        sx={{ fontFamily: "Poppins-Regular" }}
                      >
                        Nenhum pet disponível
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>

                <FormControl
                  fullWidth
                  margin="normal"
                  style={{ border: "1px solid #BFBFBF", borderRadius: "5px" }}
                  sx={{
                    maxWidth: "500px",
                    margin: "25px auto", // Centraliza o FormControl
                  }}
                >
                  <InputLabel
                    id="employer-select-label"
                    sx={{ color: "#A8A8A8", fontFamily: "Poppins-Regular" }}
                  >
                    Funcionário
                  </InputLabel>
                  <Select
                    labelId="employer-select-label"
                    id="employer-select"
                    value={selectedEmployer}
                    onChange={handleEmployerChange}
                    IconComponent={() => (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        style={{
                          marginRight: "20px",
                          fontSize: "1.2rem",
                          color: "#BFBFBF",
                        }}
                      />
                    )}
                    label="Selecione um funcionário"
                  >
                    {employers && employers.length > 0 ? (
                      employers.map((employer) => (
                        <MenuItem
                          key={employer.id}
                          value={employer.id}
                          sx={{ fontFamily: "Poppins-Regular" }}
                        >
                          {employer.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="" disabled>
                        Nenhum funcionário disponível
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>

                <TextField
                  type="date"
                  fullWidth
                  margin="normal"
                  value={appointmentDate}
                  onChange={handleDateChange}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    border: "1px solid #BFBFBF",
                    borderRadius: "5px",
                    maxWidth: "500px",
                    margin: "0 auto", // Centraliza o TextField
                    "& input": {
                      fontFamily: "Poppins-Regular",
                      fontSize: "1rem",
                      color: "#A8A8A8",
                    },
                    "& input::placeholder": {
                      color: "#BFBFBF",
                      opacity: 1,
                    },
                  }}
                />

                <FormControl
                  fullWidth
                  margin="normal"
                  style={{ border: "1px solid #BFBFBF", borderRadius: "5px" }}
                  sx={{
                    maxWidth: "500px",
                    margin: "25px auto", // Centraliza o FormControl
                  }}
                >
                  <InputLabel
                    id="time-select-label"
                    sx={{ color: "#A8A8A8", fontFamily: "Poppins-Regular" }}
                  >
                    Hora da Consulta
                  </InputLabel>
                  <Select
                    labelId="time-select-label"
                    id="time-select"
                    value={appointmentTime}
                    onChange={handleTimeChange}
                    IconComponent={() => (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        style={{
                          marginRight: "20px",
                          fontSize: "1.2rem",
                          color: "#BFBFBF",
                        }}
                      />
                    )}
                    label="Hora da Consulta"
                  >
                    {availableTimes.map((time) => (
                      <MenuItem
                        key={time}
                        value={time}
                        sx={{ fontFamily: "Poppins-Regular" }}
                      >
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginTop="20px"
                  paddingX="20px"
                  sx={{ width: "100%" }} // Garante que a Box use toda a largura disponível
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#BFBFBF", fontWeight: "bold" }}
                  >
                    R$ {service.price}
                  </Typography>
                  <Button
                    onClick={handleScheduleAppointment}
                    sx={{
                      backgroundColor: "#EB389A",
                      color: "white",
                      width: "60%",
                      minWidth: "150px",
                      marginLeft: "20px", // Espaço entre o preço e o botão
                      fontFamily: "Poppins-Bold",
                      textTransform: "unset",
                      fontSize: "1.2rem",
                      marginBottom: "25px",
                      "&:hover": {
                        backgroundColor: "#D5006D",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    Agendar
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ServiceDetails;
