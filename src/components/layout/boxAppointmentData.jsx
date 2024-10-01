import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faTimes, faEdit } from "@fortawesome/free-solid-svg-icons"; // Ícones
import axios from "../../axios/axios"; // Ajuste se necessário

function BoxAppointments({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState({});
  const [services, setServices] = useState({});
  const [employees, setEmployees] = useState({});
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false); // Estado para controlar o modal
  const [selectedAppointment, setSelectedAppointment] = useState(null); // Agendamento selecionado para edição
  const [updatedDate, setUpdatedDate] = useState("");
  const [updatedTime, setUpdatedTime] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.getAppointmentByUser();
      const appointmentsData = response.data.data;
      setAppointments(appointmentsData);

      await Promise.all(
        appointmentsData.map(async (appt) => {
          const petPromise = appt.pet_id ? axios.getPetById(appt.pet_id) : Promise.resolve(null);
          const servicePromise = appt.service_id ? axios.getServiceById(appt.service_id) : Promise.resolve(null);
          const employeePromise = appt.employer_id ? axios.getEmployeeById(appt.employer_id) : Promise.resolve(null);

          const [petResponse, serviceResponse, employeeResponse] = await Promise.all([petPromise, servicePromise, employeePromise]);

          if (petResponse) {
            setPets((prevPets) => ({
              ...prevPets,
              [appt.pet_id]: petResponse.data.data,
            }));
          }

          if (serviceResponse) {
            setServices((prevServices) => ({
              ...prevServices,
              [appt.service_id]: serviceResponse.data.data,
            }));
          }

          if (employeeResponse) {
            setEmployees((prevEmployees) => ({
              ...prevEmployees,
              [appt.employer_id]: employeeResponse.data.data,
            }));
          }
        })
      );
    } catch (err) {
      console.error("Erro ao carregar agendamentos:", err);
      setError("Erro ao carregar agendamentos.");
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await axios.deleteAppointment(appointmentId);
      fetchAppointments();
    } catch (err) {
      console.error("Erro ao cancelar agendamento:", err);
      setError("Erro ao cancelar agendamento.");
    }
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setUpdatedDate(appointment.appointment_date);
    setUpdatedTime(appointment.appointment_time);
    setOpenModal(true);
  };

  const handleUpdateAppointment = async () => {
    try {
      await axios.updateAppointment(selectedAppointment.id, {
        appointment_date: updatedDate,
        appointment_time: updatedTime,
      });
      setOpenModal(false);
      fetchAppointments();
    } catch (err) {
      console.error("Erro ao atualizar agendamento:", err);
      setError("Erro ao atualizar agendamento.");
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const formatDateTime = (date, time) => {
    const dateTimeString = `${date}T${time}`;
    const dateTime = new Date(dateTimeString);
    
    return dateTime.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ marginTop: "50px" }}>
        <Box
          sx={{
            border: "1px solid #BFBFBF",
            borderRadius: "10px",
            width: "80%",
            margin: "auto",
            padding: "20px",
            boxShadow: "0px 4px 4px rgba(191, 191, 191, 0.75)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontFamily: "Poppins-Bold", marginBottom: "20px" }}
          >
            Meus Agendamentos
          </Typography>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
          {appointments.length === 0 ? (
            <Typography>Nenhum agendamento encontrado.</Typography>
          ) : (
            appointments.map((appt) => (
              <Grid container key={appt.id} sx={{ marginBottom: "10px", borderBottom: "1px solid #D9D9D9", paddingBottom: "10px" }}>
                <Grid item xs={12} sm={4}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins-Regular",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <FontAwesomeIcon icon={faCalendar} style={{ color: "#D9D9D9" }} />
                    {formatDateTime(appt.appointment_date, appt.appointment_time)}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography sx={{ fontFamily: "Poppins-Regular" }}>
                    {services[appt.service_id]?.name || "Serviço não especificado"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4} container spacing={2}>
                  <Grid item xs={6}>
                    <Typography sx={{ fontFamily: "Poppins-Regular" }}>
                      {employees[appt.employer_id]?.name || "Funcionário não especificado"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} container alignItems="center">
                    <Typography sx={{ fontFamily: "Poppins-Regular", display: "flex", alignItems: "center" }}>
                      Pet: {pets[appt.pet_id]?.name || "Carregando..."}
                      <Button
                        onClick={() => handleEditAppointment(appt)} // Passa o agendamento para edição
                        sx={{ marginLeft: "10px", padding: "0", minWidth: "0" }}
                      >
                        <FontAwesomeIcon icon={faEdit} style={{ color: "blue" }} />
                      </Button>
                      <Button
                        onClick={() => handleCancelAppointment(appt.id)}
                        sx={{ marginLeft: "10px", padding: "0", minWidth: "0" }}
                      >
                        <FontAwesomeIcon icon={faTimes} style={{ color: "red" }} />
                      </Button>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))
          )}
        </Box>
      </Grid>

      {/* Modal de Edição de Agendamento */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            margin: "auto",
            marginTop: "100px",
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Editar Agendamento
          </Typography>
          <TextField
            label="Data"
            type="date"
            value={updatedDate}
            onChange={(e) => setUpdatedDate(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Hora"
            type="time"
            value={updatedTime}
            onChange={(e) => setUpdatedTime(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleCloseModal} sx={{ marginRight: 2 }}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateAppointment} variant="contained" color="primary">
              Atualizar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default BoxAppointments;
