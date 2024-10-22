import React, { useState } from "react";
import { Typography, Box, Button, Modal } from "@mui/material";
import axios from "../../../../axios/axios";
import InputPet from "../../../../components/inputs/inputPET";
import InputDate from "../../../../components/inputs/inputDate";
import InputTime from "../../../../components/inputs/inputTime";
import InputEmployer from "../../../../components/inputs/inputEmployer";

// Função para formatar data e hora
const formatDateTime = (date, time) => {
  const formattedDate = new Date(`${date}T${time}`);
  return formattedDate.toISOString(); // Converte para formato ISO
};

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

function BoxCreateAppointment() {
  const [open, setOpen] = useState(false);
  const [petId, setPetId] = useState("");
  const [employerId, setEmployerId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleOpen = () => {
    setOpen(true);
    setError("");
    setSuccess("");
    setPetId("");
    setEmployerId("");
    setDate("");
    setTime("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      const appointmentData = {
        pet_id: petId,
        employer_id: employerId,
        appointment_date: formatDateTime(date, time), // Formatação
      };

      await axios.createAppointment(appointmentData);
      setSuccess("Agendamento criado com sucesso!");
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Erro ao criar agendamento:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Erro ao criar agendamento.");
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
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
        Criar Novo Agendamento
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography
            sx={{
              fontFamily: "Poppins-Bold",
              fontSize: "1.3rem",
              marginTop: "30px",
              textAlign: "center",
            }}
          >
            Criar Agendamento
          </Typography>
          {error && (
            <Typography sx={{ color: "red", textAlign: "center" }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography sx={{ color: "green", textAlign: "center" }}>
              {success}
            </Typography>
          )}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <InputPet value={petId} onChange={(e) => setPetId(e.target.value)} />
            <InputEmployer value={employerId} onChange={(e) => setEmployerId(e.target.value)} />
            <InputDate value={date} onChange={(e) => setDate(e.target.value)} />
            <InputTime value={time} onChange={(e) => setTime(e.target.value)} />
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
                "&:hover": {
                  backgroundColor: "#D5006D",
                },
              }}
            >
              Criar Agendamento
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default BoxCreateAppointment;
