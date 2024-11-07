import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, Button, Modal } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAt,
  faIdCard,
  faPhone,
  faPen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import InputName from "../inputs/inputName";
import InputEmail from "../inputs/inputEmail";
import InputPhone from "../inputs/inputPhone";
import sheets from "../../axios/axios";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  minWidth: "300px",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
};

function BoxPersonalData({ user, updateUser }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [cpf, setCpf] = useState(user.cpf);
  const [phone, setPhone] = useState(user.phone);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setCpf(user.cpf);
    setPhone(user.phone);
  }, [user]);

  const handleOpen = () => {
    setError("");
    setSuccess("");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleUpdate = async () => {
    try {
      const updatedUser = {
        ...user, // Mantém as propriedades atuais, como photoURL
        name,
        email,
        cpf,
        phone,
      };

      if (!name || !email || !cpf || !phone) {
        setError("Todos os campos são obrigatórios.");
        return;
      }

      await sheets.putUser(updatedUser, user.id);

      updateUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser)); // Atualiza o localStorage

      handleClose();

      setSuccess("Dados atualizados com sucesso!");
      setError("");
    } catch (err) {
      console.error("Erro na atualização:", err.response?.data || err.message);
      setError("Erro ao atualizar dados. Tente novamente.");
      setSuccess("");
    }
  };

  const formatCPF = (cpf) =>
    cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  const formatPhone = (phone) =>
    phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    

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
          <Grid container>
            <Grid item xs={8}>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "Poppins-Regular",
                }}
              >
                <FontAwesomeIcon icon={faUser} style={{ color: "#D9D9D9" }} />
                {user.name}
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "Poppins-Regular",
                  marginTop: "5px",
                }}
              >
                <FontAwesomeIcon icon={faAt} style={{ color: "#D9D9D9" }} />
                {user.email}
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "Poppins-Regular",
                  marginTop: "5px",
                }}
              >
                <FontAwesomeIcon icon={faIdCard} style={{ color: "#D9D9D9" }} />
                {formatCPF(user.cpf)}
              </Typography>

              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "Poppins-Regular",
                  marginTop: "5px",
                }}
              >
                <FontAwesomeIcon icon={faPhone} style={{ color: "#D9D9D9" }} />
                {formatPhone(user.phone)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12} // Agora ocupa 100% em telas pequenas
              md={4} // Ocupa 4/12 em telas médias e maiores
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                marginTop: { xs: "10px", md: "0" }, // Margem em telas pequenas
              }}
            >
              <Button onClick={handleOpen}>
                <FontAwesomeIcon
                  icon={faPen}
                  style={{ fontSize: "2rem", color: "#D9D9D9" }}
                />
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              margin: "auto",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins-Bold",
                fontSize: "1.2rem",
                marginTop: "30px",
                marginBottom: "10px",
              }}
            >
              Atualizar dados pessoais
            </Typography>
            {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
            {success && (
              <Typography sx={{ color: "green" }}>{success}</Typography>
            )}
            <InputName value={name} onChange={(e) => setName(e.target.value)} />
            <InputEmail
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputPhone
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button
              sx={{
                width: "80%",
                maxWidth: "300px",
                backgroundColor: "#EB389A",
                marginTop: "25px",
                fontFamily: "Poppins-Bold",
                color: "#FFF",
                textTransform: "capitalize",
                fontSize: "1.3rem",
                "&:hover": {
                  backgroundColor: "#D5006D",
                },
              }}
              onClick={handleUpdate}
            >
              Atualizar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default BoxPersonalData;
