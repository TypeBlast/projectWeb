import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState("");
  const [employers, setEmployers] = useState([]);
  const [selectedEmployer, setSelectedEmployer] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false); // Estado do Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Mensagem do Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Tipo de alerta

  const token = localStorage.getItem("token");

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
      for (let hour = 8; hour < 18; hour++) { // Alterado para parar às 17h
        for (let minute = 0; minute < 60; minute += 30) {
          const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
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
      setTimeout(() => window.location.reload(), 2000);
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
    >
      <Box
        width="80%"
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

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100%",
              marginTop: "50px",
            }}
          >
            <Box>
              <FormControl
                fullWidth
                margin="normal"
                style={{ border: "1px solid #BFBFBF", borderRadius: "5px" }}
                sx={{
                  maxWidth: "500px", // Largura máxima de 500px
                  width: "90%", // Largura padrão de 80%
                  margin: "0 auto", // Centraliza o formControl
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
                  maxWidth: "500px", // Largura máxima de 500px
                  width: "90%", // Largura padrão de 80%
                  margin: "25px auto", // Centraliza o formControl
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

              {/* Campo de Data */}
              <TextField
                type="date"
                fullWidth
                margin="normal"
                value={appointmentDate}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    placeholder: "dd/mm/aaaa", // Define o placeholder
                  },
                }}
                sx={{
                  border: "1px solid #BFBFBF",
                  borderRadius: "5px",
                  maxWidth: "500px", // Largura máxima de 500px
                  width: "90%", // Largura padrão de 80%
                  margin: "0 auto", // Centraliza o formControl
                  "& input": {
                    fontFamily: "Poppins-Regular", // Personaliza a fonte do texto
                    fontSize: "1rem", // Tamanho da fonte
                    color: "#A8A8A8", // Cor do texto
                  },
                  "& input::placeholder": {
                    color: "#BFBFBF", // Cor do placeholder
                    opacity: 1, // Para garantir que o placeholder tenha a cor definida
                  },
                }}
              />

              {/* Campo de Horário */}
              <FormControl
                fullWidth
                margin="normal"
                style={{ border: "1px solid #BFBFBF", borderRadius: "5px" }}
                sx={{
                  maxWidth: "500px", // Largura máxima de 500px
                  width: "90%", // Largura padrão de 80%
                  margin: "25px auto", // Centraliza o formControl
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

              {/* Preço e Botão */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="20px"
                paddingX="20px"
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
                    fontFamily: "Poppins-Bold",
                    textTransform: "unset",
                    fontSize: "1.2rem",
                    "&:hover": { backgroundColor: "#D5006D", transform: "scale(1.05)" },
                  }}
                >
                  Agendar
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Define a posição à direita
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
