import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, Button, Modal } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faTimes, faPen } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios/axios";
import InputTime from "../inputs/inputTime";
import InputDate from "../inputs/inputDate";

function BoxAppointments({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState({});
  const [services, setServices] = useState({});
  const [employees, setEmployees] = useState({});
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);  
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [updatedDate, setUpdatedDate] = useState("");
  const [updatedTime, setUpdatedTime] = useState("");
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.getAppointmentByUser();
      const appointmentsData = response.data.data;

      
      const sortedAppointments = appointmentsData.sort((a, b) => {
        const dateA = new Date(`${a.appointment_date}T${a.appointment_time}`);
        const dateB = new Date(`${b.appointment_date}T${b.appointment_time}`);
        return dateA - dateB;
      });

      setAppointments(sortedAppointments);

      await Promise.all(
        sortedAppointments.map(async (appt) => {
          const petPromise = appt.pet_id
            ? axios.getPetById(appt.pet_id)
            : Promise.resolve(null);
          const servicePromise = appt.service_id
            ? axios.getServiceById(appt.service_id)
            : Promise.resolve(null);
          const employeePromise = appt.employer_id
            ? axios.getEmployeeById(appt.employer_id)
            : Promise.resolve(null);

          const [petResponse, serviceResponse, employeeResponse] =
            await Promise.all([petPromise, servicePromise, employeePromise]);

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
    } catch (err) {}
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await axios.deleteAppointment(appointmentId);
      fetchAppointments();
      setOpenConfirmModal(false);
    } catch (err) {
      console.error("Erro ao cancelar agendamento:", err);
      setError("Erro ao cancelar agendamento.");
    }
  };

  const openConfirmationModal = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenConfirmModal(true); 
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

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
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
            minWidth: "300px",
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
            <>
              <Grid
                container
                sx={{
                  marginBottom: "10px",
                  borderBottom: "2px solid #000",
                  paddingBottom: "10px",
                  display: { xs: "none", sm: "flex" },
                }}
              >
                <Grid item xs={10} sm={3}>
                  <Typography sx={{ fontFamily: "Poppins-Bold" }}>
                    Data e Hora
                  </Typography>
                </Grid>
                <Grid item xs={10} sm={3}>
                  <Typography sx={{ fontFamily: "Poppins-Bold" }}>
                    Serviço
                  </Typography>
                </Grid>
                <Grid item xs={10} sm={3}>
                  <Typography sx={{ fontFamily: "Poppins-Bold" }}>
                    Funcionário
                  </Typography>
                </Grid>
                <Grid item xs={10} sm={3}>
                  <Typography sx={{ fontFamily: "Poppins-Bold" }}>
                    Pet
                  </Typography>
                </Grid>
              </Grid>

              {appointments.map((appt) => (
                <Grid
                  container
                  key={appt.id}
                  sx={{
                    marginBottom: "10px",
                    borderBottom: "1px solid #D9D9D9",
                    paddingBottom: "10px",
                    display: { xs: "block", sm: "flex" },
                  }}
                >
                  <Grid item xs={10} sm={3}>
                    <Typography
                      sx={{
                        fontFamily: "Poppins-Regular",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCalendar}
                        style={{ color: "#D9D9D9" }}
                      />
                      {formatDateTime(
                        appt.appointment_date,
                        appt.appointment_time
                      )}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={10}
                    sm={3}
                    sx={{ display: { xs: "none", sm: "block" } }}
                  >
                    <Typography sx={{ fontFamily: "Poppins-Regular" }}>
                      {services[appt.service_id]?.name ||
                        "Serviço não especificado"}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={10}
                    sm={3}
                    sx={{ display: { xs: "none", sm: "block" } }}
                  >
                    <Typography sx={{ fontFamily: "Poppins-Regular" }}>
                      {employees[appt.employer_id]?.name ||
                        "Funcionário não especificado"}
                    </Typography>
                  </Grid>

                  <Grid
  item
  xs={10}
  sm={3}
  container
  alignItems="center"
  sx={{
    display: "flex",
    gap: "10px",
  }}
>
  <Typography
    sx={{
      fontFamily: "Poppins-Regular",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start", 
      marginBottom: "10px" 
    }}
  >
    {pets[appt.pet_id]?.name || "Carregando..."}
  </Typography>

  <Grid
    item
    xs={4}
    sm={8}
    container
    alignItems="center"
    justifyContent="flex-end"
    sx={{
      display: "flex",
      gap: "5px",
    }}
  >
    <Button
      onClick={(e) => {
        e.stopPropagation();
        handleEditAppointment(appt);
      }}
      sx={{
        padding: "0",
        minWidth: "0",
        color: "#D9D9D9",
        "&:hover": { color: "#EB389A" },
      }}
    >
      <FontAwesomeIcon
        icon={faPen}
        style={{ fontSize: "1.6rem", marginBottom: "10px" }}
      />
    </Button>

    <Button
      onClick={(e) => {
        e.stopPropagation();
        openConfirmationModal(appt);
      }}
      sx={{
        padding: "0",
        minWidth: "0",
        color: "#D9D9D9",
        marginLeft: "8px",
        "&:hover": { color: "#EB389A" },
      }}
    >
      <FontAwesomeIcon
        icon={faTimes}
        style={{ fontSize: "1.6rem", marginBottom: "10px" }}
      />
    </Button>
  </Grid>
</Grid>
                  </Grid>
              ))}
            </>
          )}
        </Box>
      </Grid>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            width: "40%",
            minWidth: "300px",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            margin: "auto",
            marginTop: "100px",
          }}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", marginBottom: "20px" }}
          >
            Editar Agendamento
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <InputDate
              appointmentDate={updatedDate}
              setAppointmentDate={setUpdatedDate}
            />
            <InputTime
              appointmentTime={updatedTime}
              setAppointmentTime={setUpdatedTime}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              onClick={handleCloseModal}
              sx={{
                width: "300px",
                backgroundColor: "#EB389A",
                marginTop: "20px",
                fontFamily: "Poppins-Bold",
                color: "#FFF",
                textTransform: "capitalize",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#D5006D",
                },
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleUpdateAppointment}
              sx={{
                width: "300px",
                backgroundColor: "#EB389A",
                marginTop: "20px",
                fontFamily: "Poppins-Bold",
                color: "#FFF",
                textTransform: "capitalize",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#D5006D",
                },
              }}
            >
              Confirmar
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openConfirmModal}
        onClose={handleCloseConfirmModal}
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-description"
      >
        <Box
          sx={{
            width: "40%",
            minWidth: "300px",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            margin: "auto",
            marginTop: "100px",
          }}
        >
          <Typography
            id="confirm-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", marginBottom: "20px" }}
          >
            Confirmar Cancelamento
          </Typography>
          <Typography sx={{ textAlign: "center", marginBottom: "20px" }}>
            Você tem certeza que deseja cancelar este agendamento?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              gap: "10px",
            }}
          >
            <Button
              onClick={handleCloseConfirmModal}
              sx={{
                width: "150px",
                backgroundColor: "#EB389A",
                marginTop: "20px",
                fontFamily: "Poppins-Bold",
                color: "#FFF",
                textTransform: "capitalize",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#D5006D",
                },
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => handleCancelAppointment(selectedAppointment.id)}
              sx={{
                width: "150px",
                backgroundColor: "#EB389A",
                marginTop: "20px",
                fontFamily: "Poppins-Bold",
                color: "#FFF",
                textTransform: "capitalize",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#D5006D",
                },
              }}
            >
              Confirmar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default BoxAppointments;
