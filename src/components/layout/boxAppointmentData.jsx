import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, Button, Modal, IconButton, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faXmark, faCalendar } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios/axios"; // Ajuste se necessário

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35%",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
};

function BoxAppointments({ user }) {
  const [open, setOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);

  // Estados para os novos campos
  const [date, setDate] = useState("");
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [client, setClient] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.getAppointments(user.id); // Ajuste a chamada da API conforme necessário
      setAppointments(response.data.data);
    } catch (err) {
      console.error("Erro ao carregar agendamentos:", err);
      setError("Erro ao carregar agendamentos.");
    }
  };

  const handleOpen = () => {
    setError("");
    setSuccess("");
    setDate("");
    setService("");
    setDescription("");
    setClient("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (appointment) => {
    // Implementar função de edição de agendamento
    console.log("Editar agendamento:", appointment);
  };

  const handleDelete = async (appointmentId) => {
    try {
      await axios.deleteAppointment(appointmentId); // Ajuste a chamada da API conforme necessário
      setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
      setSuccess("Agendamento deletado com sucesso!");
      setConfirmDeleteOpen(false);
    } catch (err) {
      console.error("Erro ao deletar agendamento:", err);
      setError("Erro ao deletar agendamento.");
      setConfirmDeleteOpen(false);
    }
  };

  const handleSave = async () => {
    try {
      // Implementar lógica de salvar agendamento
      const newAppointment = { date, service, description, client };
      const response = await axios.createAppointment(newAppointment); // Ajuste a chamada da API conforme necessário
      setAppointments((prev) => [...prev, response.data]);
      setSuccess("Agendamento criado com sucesso!");
      handleClose();
    } catch (err) {
      console.error("Erro ao salvar agendamento:", err);
      setError("Erro ao salvar agendamento.");
    }
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
          {success && <Typography sx={{ color: "green" }}>{success}</Typography>}
          {appointments.length === 0 ? (
            <Typography>Nenhum agendamento encontrado.</Typography>
          ) : (
            appointments.map((appt) => (
              <Grid container key={appt.id} sx={{ marginBottom: "10px" }}>
                <Grid item xs={8}>
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
                    {`${appt.date} - ${appt.service}`}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={() => handleEdit(appt)}
                    sx={{
                      backgroundColor: "transparent",
                      minWidth: "auto",
                      '&:hover': {
                        backgroundColor: "#D9D9D9",
                      },
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPen}
                      style={{ fontSize: "1rem", color: "#D9D9D9" }}
                    />
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentAppointment(appt);
                      setConfirmDeleteOpen(true);
                    }}
                    sx={{
                      marginLeft: "10px",
                      backgroundColor: "transparent",
                      minWidth: "auto",
                      '&:hover': {
                        backgroundColor: "#D9D9D9",
                      },
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ fontSize: "1rem", color: "#D9D9D9" }}
                    />
                  </Button>
                </Grid>
              </Grid>
            ))
          )}
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              width: "300px",
              backgroundColor: "#EB389A",
              marginTop: "20px",
              fontFamily: "Poppins-Bold",
              color: "#FFF",
              textTransform: "capitalize",
              fontSize: "1rem",
              '&:hover': {
                backgroundColor: "#D5006D",
              },
            }}
          >
            Adicionar Novo Agendamento
          </Button>
        </Box>
      </Grid>

      {/* Modal para Adicionar/Editar Agendamento */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Button
            onClick={handleClose}
            sx={{ position: "absolute", top: 10, right: 25, minWidth: "auto" }}
          >
            <FontAwesomeIcon
              icon={faXmark}
              style={{ color: "#BFBFBF", fontSize: "1.5rem" }}
            />
          </Button>
          <Typography
            sx={{
              fontFamily: "Poppins-Bold",
              fontSize: "1.3rem",
              marginTop: "30px",
              textAlign: "center",
            }}
          >
            Adicionar Agendamento
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              label="Data"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ marginBottom: "10px", width: "100%" }}
            />
            <TextField
              label="Serviço"
              value={service}
              onChange={(e) => setService(e.target.value)}
              sx={{ marginBottom: "10px", width: "100%" }}
            />
            <TextField
              label="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ marginBottom: "10px", width: "100%" }}
            />
            <TextField
              label="Cliente"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              sx={{ marginBottom: "10px", width: "100%" }}
            />
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{
                backgroundColor: "#EB389A",
                color: "#FFF",
                textTransform: "capitalize",
                fontSize: "1rem",
                marginTop: "20px",
                width: "100%",
                fontFamily: "Poppins-Bold",
                '&:hover': {
                  backgroundColor: "#D5006D",
                },
              }}
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal de confirmação de exclusão */}
      <Modal
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <Box sx={modalStyle}>
          <Typography
            sx={{
              fontFamily: "Poppins-Bold",
              fontSize: "1.3rem",
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            Tem certeza que deseja deletar este agendamento?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
            <Button
              onClick={() => handleDelete(currentAppointment.id)}
              variant="contained"
              sx={{
                backgroundColor: "#EB389A",
                color: "#FFF",
                textTransform: "capitalize",
                fontSize: "1rem",
                fontFamily: "Poppins-Bold",
                '&:hover': {
                  backgroundColor: "#D5006D",
                },
              }}
            >
              Sim
            </Button>
            <Button
              onClick={() => setConfirmDeleteOpen(false)}
              variant="outlined"
              sx={{
                color: "#EB389A",
                textTransform: "capitalize",
                fontSize: "1rem",
                fontFamily: "Poppins-Bold",
              }}
            >
              Não
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default BoxAppointments;
