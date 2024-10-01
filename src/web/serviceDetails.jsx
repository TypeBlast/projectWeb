import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import sheets from "../axios/axios"; 
import { Box, Typography, Grid, Select, MenuItem, FormControl, InputLabel, Button, TextField } from "@mui/material";

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

  const token = localStorage.getItem('token');

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
      for (let hour = 8; hour <= 18; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
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

  const handleScheduleAppointment = async () => {
    if (!selectedPet || !selectedEmployer || !appointmentDate || !appointmentTime) {
      console.error("Por favor, preencha todos os campos");
      return;
    }

    const appointment = {
      service_id: service.id,
      employer_id: selectedEmployer,
      pet_id: selectedPet,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
    };

    try {
      const response = await sheets.createAppointment(appointment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Consulta agendada:", response.data);
    } catch (error) {
      console.error("Erro ao agendar consulta", error);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!service) {
    return <p>Serviço não encontrado</p>;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="95vh">
      <Box width="80%" maxWidth="900px" border="3px solid #BFBFBF" borderRadius="15px" minHeight="450px" paddingBottom="10px" boxShadow={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems={{ xs: "center", md: "flex-start" }} minHeight="325px" padding={{ xs: "20px", md: "50px" }}>
              <Typography variant="h4" sx={{ fontFamily: "Poppins-Bold", marginBottom: "20px", textAlign: { xs: "center", md: "left" } }}>
                {service.name}
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: "Poppins-Regular", color: "#A8A8A8", textAlign: { xs: "center", md: "left" } }}>
                {service.description}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100%", marginTop: "50px" }}>
            <Box>
              <FormControl fullWidth margin="normal">
                <InputLabel id="pet-select-label">Selecione um Pet</InputLabel>
                <Select
                  labelId="pet-select-label"
                  id="pet-select"
                  value={selectedPet}
                  onChange={handlePetChange}
                  label="Selecione um Pet"
                >
                  {pets.data && pets.data.length > 0 ? (
                    pets.data.map((pet) => (
                      <MenuItem key={pet.id} value={pet.id}>
                        {pet.name} 
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      Nenhum pet disponível
                    </MenuItem>
                  )}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel id="employer-select-label">Selecione um funcionário</InputLabel>
                <Select
                  labelId="employer-select-label"
                  id="employer-select"
                  value={selectedEmployer}  
                  onChange={handleEmployerChange}  
                  label="Selecione um funcionário"
                >
                  {employers && employers.length > 0 ? (
                    employers.map((employer) => (
                      <MenuItem key={employer.id} value={employer.id}>
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
                label="Data da Consulta"
                fullWidth
                margin="normal"
                value={appointmentDate}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel id="time-select-label">Hora da Consulta</InputLabel>
                <Select
                  labelId="time-select-label"
                  id="time-select"
                  value={appointmentTime}
                  onChange={handleTimeChange}
                  label="Hora da Consulta"
                >
                  {availableTimes.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="20px" paddingX="20px">
                <Typography variant="h6" sx={{ color: "#BFBFBF", fontWeight: "bold" }}>
                  R$ {service.price}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#D5006D", color: "white", '&:hover': { backgroundColor: "#B0004A" } }}
                  onClick={handleScheduleAppointment} // Chama a função ao clicar
                >
                  Agendar
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ServiceDetails;
