import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import axios from "../../../axios/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCalendar } from "@fortawesome/free-solid-svg-icons";
import BoxCreateAppointment from "../components/layout/boxCreateAppointment";

// Função para formatar a data e a hora do agendamento
const formatDateTime = (date, time) => {
  return `${new Date(date).toLocaleDateString()} - ${time || "Hora indefinida"}`;
};

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState({});
  const [services, setServices] = useState({});
  const [employees, setEmployees] = useState({});
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  // Função para buscar agendamentos e informações associadas
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
    }
  };

  const handleDeleteAppointment = async () => {
    try {
      if (selectedAppointmentId) {
        await axios.deleteAppointment(selectedAppointmentId);
        fetchAppointments();
        handleCloseConfirmModal();
      }
    } catch (error) {
      console.error("Erro ao deletar agendamento:", error);
    }
  };

  const handleClickOpen = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setOpenConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
    setSelectedAppointmentId(null);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="container" style={{ padding: "20px" }}>
      <BoxCreateAppointment />
      {Array.isArray(appointments) && appointments.length > 0 ? (
        appointments.map((appointment) => (
          <Box key={appointment.id} sx={{ margin: "10px 0", borderBottom: "1px solid #D9D9D9", paddingBottom: "10px" }}>
            <Typography variant="h6" component="div">
              Agendamento para {pets[appointment.pet_id]?.name || "Pet não encontrado"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Serviço: {services[appointment.service_id]?.name || "Serviço não encontrado"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Funcionário: {employees[appointment.employer_id]?.name || "Funcionário não encontrado"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Data e Hora: {formatDateTime(appointment.date, appointment.time)}
            </Typography>
            <Button
              onClick={() => handleClickOpen(appointment.id)}
              sx={{
                width: "100%",
                backgroundColor: "#EB389A",
                marginTop: "10px",
                fontFamily: "Poppins-Bold",
                color: "#FFF",
                textTransform: "capitalize",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#D5006D",
                },
              }}
            >
              <FontAwesomeIcon icon={faTrash} style={{ marginRight: "5px" }} />
              Cancelar Agendamento
            </Button>
          </Box>
        ))
      ) : (
        <Typography variant="body1" color="text.secondary">
          Nenhum agendamento disponível.
        </Typography>
      )}

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        open={openConfirmModal}
        onClose={handleCloseConfirmModal}
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-description"
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
          <Typography id="confirm-modal-title" variant="h6" component="h2" sx={{ textAlign: "center", marginBottom: "20px" }}>
            Confirmar Exclusão
          </Typography>
          <Typography sx={{ textAlign: "center", marginBottom: "20px" }}>
            Você tem certeza que deseja cancelar este agendamento?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
              onClick={handleDeleteAppointment}
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
    </div>
  );
}

export default AdminAppointments;
