import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, Modal } from "@mui/material";
import axios from "../../../axios/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import InputName from "../../../components/inputs/inputName";
import InputEmail from "../../../components/inputs/inputEmail";
import InputPhone from "../../../components/inputs/inputPhone";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.getAllUsers();
      const usersData = response.data.data;
      setUsers(usersData);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setUpdatedName(user.name);
    setUpdatedPhone(user.phone);
    setUpdatedEmail(user.email);
    setOpenModal(true);
  };

  const handleUpdateUser = async () => {
    try {
      await axios.putUser({
        name: updatedName,
        phone: updatedPhone,
        email: updatedEmail,
      }, selectedUser.id); 
      setOpenModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      if (selectedUserId) {
        await axios.deleteUser(selectedUserId);
        fetchUsers();
        handleCloseConfirmModal();
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  const handleClickOpen = (userId) => {
    setSelectedUserId(userId);
    setOpenConfirmModal(true);
  };

  
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
    setSelectedUserId(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "row", marginTop: "50px", justifyContent: "start", position: "relative" }}>
        <Typography sx={{ marginLeft: "140px", marginTop: "20px", fontFamily: "Poppins-Bold", fontSize: "1.5rem" }}>
          Usuários Administrativos
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
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
            Todos os Usuários
          </Typography>

          <Grid container sx={{ marginBottom: "10px", borderBottom: "2px solid #000", paddingBottom: "10px" }}>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1" sx={{ fontFamily: "Poppins-Bold" }}>Nome</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontFamily: "Poppins-Bold" }}>E-mail</Typography>
            </Grid>
          </Grid>

          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <Grid container key={user.id} sx={{ marginBottom: "10px", borderBottom: "1px solid #D9D9D9", paddingBottom: "10px" }}>
                <Grid item xs={12} sm={4}>
                  <Typography sx={{ fontFamily: "Poppins-Regular" }}>{user.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Typography sx={{ fontFamily: "Poppins-Regular", color: "text.secondary" }}>{user.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
                  
                <Button onClick={() => handleEditUser(user)} 
                sx={{
                   backgroundColor: "#EB389A",
                    color: "#FFF",
                     textTransform: "capitalize", 
                     fontSize: "1rem",
                      "&:hover": { 
                        backgroundColor: "#D5006D"
                       },
                         }}>
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                  <Button
                    onClick={() => handleClickOpen(user.id)} 
                    sx={{
                      backgroundColor: "#EB389A",
                      color: "#FFF",
                      textTransform: "capitalize",
                      fontSize: "1rem",
                      marginLeft:"10px",
                      "&:hover": {
                        backgroundColor: "#D5006D",
                      },
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </Grid>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              Nenhum usuário disponível.
            </Typography>
          )}
        </Box>
      </Grid>

        {/* Modal de Edição de Funcionário */}
        <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ width: 400, bgcolor: "background.paper", borderRadius: "8px", boxShadow: 24, p: 4, margin: "auto", marginTop: "100px" }}>
          <Typography variant="h6" component="h2" sx={{ textAlign: "center", marginBottom: "20px" }}>Editar Usuário</Typography>
          <InputName value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
          <InputPhone value={updatedPhone} onChange={(e) => setUpdatedPhone(e.target.value)} />
          <InputEmail value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} />
         

          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "20px" }}>
            <Button onClick={handleCloseModal} sx={{ width: "250px",
                backgroundColor: "#EB389A",
                marginTop: "20px",
                fontFamily: "Poppins-Bold",
                color: "#FFF",
                textTransform: "capitalize",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#D5006D",} }}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateUser} sx={{ width: "250px",
                backgroundColor: "#EB389A",
                marginTop: "20px",
                fontFamily: "Poppins-Bold",
                color: "#FFF",
                textTransform: "capitalize",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#D5006D",} }}>
              Salvar
            </Button>
          </Box>
        </Box>
      </Modal>

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
            Você tem certeza que deseja excluir este usuário?
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
              onClick={handleDeleteUser}
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

export default AdminUsers;
