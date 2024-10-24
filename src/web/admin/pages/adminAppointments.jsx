import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button, Grid, Modal } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faCalendar, faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../axios/axios";
import InputDate from "../../../components/inputs/inputDate";
import InputTime from "../../../components/inputs/inputTime";

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState({});
  const [employees, setEmployees] = useState({});
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [updatedDate, setUpdatedDate] = useState("");
  const [updatedTime, setUpdatedTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.getAllAppointments(); 
      const appointmentsData = response.data.data;

      appointmentsData.sort((a, b) => {
        const dateA = new Date(`${a.appointment_date}T${a.appointment_time}`);
        const dateB = new Date(`${b.appointment_date}T${b.appointment_time}`);
        return dateA - dateB; 
      });

      setAppointments(appointmentsData);

      await Promise.all(
        appointmentsData.map(async (appt) => {
          const servicePromise = appt.service_id ? axios.getServiceById(appt.service_id) : Promise.resolve(null);
          const employeePromise = appt.employer_id ? axios.getEmployeeById(appt.employer_id) : Promise.resolve(null);

          const [serviceResponse, employeeResponse] = await Promise.all([ servicePromise, employeePromise]);


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
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
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
    <div>
      <Box sx={{ display: "flex", flexDirection: "row", marginTop: "50px", justifyContent: "start", position: "relative" }}>
        <Typography sx={{ marginLeft: "140px", marginTop: "20px", fontFamily: "Poppins-Bold", fontSize: "1.5rem" }}>
          Agendamentos Administrativos
        </Typography>

        <Box sx={{ position: "absolute", top: 0, right: "125px" }}>
          <Button onClick={handleLogout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: "#EB1A0E", fontSize: "2rem" }} />
          </Button>
        </Box>
      </Box>

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
          <Typography variant="h6" sx={{ fontFamily: "Poppins-Bold", marginBottom: "20px" }}>
            Todos Agendamentos
          </Typography>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}

          {/* Cabeçalho */}
          <Grid container sx={{ marginBottom: "10px", borderBottom: "2px solid #000", paddingBottom: "10px" }}>
            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle1" sx={{ fontFamily: "Poppins-Bold" }}>Data</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle1" sx={{ fontFamily: "Poppins-Bold" }}>Hora</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle1" sx={{ fontFamily: "Poppins-Bold" }}>Serviço</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle1" sx={{ fontFamily: "Poppins-Bold" }}>Funcionário</Typography>
            </Grid>
          </Grid>

          {appointments.length === 0 ? (
            <Typography>Nenhum agendamento encontrado.</Typography>
          ) : (
            appointments.map((appt) => (
              <Grid container key={appt.id} sx={{ marginBottom: "10px", borderBottom: "1px solid #D9D9D9", paddingBottom: "10px" }}>
                <Grid item xs={12} sm={3}>
                  <Typography sx={{ fontFamily: "Poppins-Regular", display: "flex", alignItems: "center", gap: "10px" }}>
                    <FontAwesomeIcon icon={faCalendar} style={{ color: "#D9D9D9" }} />
                    {formatDateTime(appt.appointment_date, appt.appointment_time)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography sx={{ fontFamily: "Poppins-Regular" }}>
                    {formatDateTime(appt.appointment_date, appt.appointment_time).split(", ")[1]} {/* Hora */}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography sx={{ fontFamily: "Poppins-Regular" }}>
                    {services[appt.service_id]?.name || "Serviço não especificado"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography sx={{ fontFamily: "Poppins-Regular" }}>
                    {employees[appt.employer_id]?.name || "Funcionário não especificado"}
                  </Typography>
                </Grid>
              </Grid>
            ))
          )}
        </Box>
      </Grid>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ width: 500, bgcolor: "background.paper", borderRadius: "8px", boxShadow: 24, p: 4, margin: "auto", marginTop: "100px" }}>
          <Typography variant="h6" sx={{ textAlign: "center", marginBottom: "20px" }}>Editar Agendamento</Typography>
          <InputDate appointmentDate={updatedDate} setAppointmentDate={setUpdatedDate} />
          <InputTime appointmentTime={updatedTime} setAppointmentTime={setUpdatedTime} />
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Button variant="contained" onClick={handleUpdateAppointment} sx={{ marginRight: "10px" }}>Atualizar</Button>
            <Button variant="outlined" onClick={handleCloseModal}>Cancelar</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AdminAppointments;
