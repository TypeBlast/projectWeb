import React, { useState } from "react";
import { Typography, Box, Button, Modal } from "@mui/material";
import axios from "../../../../axios/axios";
import InputNameEmployer from "../inputs/inputNameEmployer";
import InputPhoneEmployer from "../inputs/inputPhoneEmployer";
import InputPosition from "../inputs/inputPosition";
import InputService from "../inputs/inputService_id";


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

function BoxCreateEmployers() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [services, setServices] = useState([]);

  const handleOpen = async () => {
    setOpen(true);
    setError("");
    setSuccess("");
    setName("");
    setPhone("");
    setPosition("");
    setSelectedService("");

    try {
      const response = await axios.getAllServices(); 
      setServices(response.data.data);
    } catch (err) {
      console.error("Erro ao carregar serviços:", err);
      setError("Erro ao carregar serviços.");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      const employerData = {
        name,
        phone,
        position,
        service_id: selectedService,
      };

      await axios.createEmployer(employerData); 
      setSuccess("Funcionário cadastrado com sucesso!");
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Erro ao criar funcionário:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Erro ao criar funcionário.");
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
        Adicionar Novo Funcionário
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
            Adicionar Funcionário
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
            <InputNameEmployer value={name} onChange={(e) => setName(e.target.value)} />
            <InputPhoneEmployer value={phone} onChange={(e) => setPhone(e.target.value)} />
            <InputPosition value={position} onChange={(e) => setPosition(e.target.value)} />
            <InputService
              services={services} // Passando serviços
              selectedService={selectedService}
              handleServiceChange={(e) => setSelectedService(e.target.value)}
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
                "&:hover": {
                  backgroundColor: "#D5006D",
                },
              }}
            >
              Criar Funcionário
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default BoxCreateEmployers;
