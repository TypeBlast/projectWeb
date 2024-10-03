import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
} from "@mui/material";
import axios from "../../../axios/axios"; // Certifique-se de que o axios esteja configurado corretamente
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Ícone de deletar

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.getAllUsers(); // Chame sua API para buscar todos os usuários
      const usersData = response.data.data;
      setUsers(usersData);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setUsers([]);
    }
  };

  const handleDeleteUser = async () => {
    try {
      if (selectedUserId) {
        await axios.deleteUser(selectedUserId); // Chame sua API para deletar o usuário
        fetchUsers(); // Atualize a lista de usuários após a exclusão
        handleCloseConfirmModal(); // Fecha o modal
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  const handleClickOpen = (userId) => {
    setSelectedUserId(userId);
    setOpenConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
    setSelectedUserId(null); // Limpa o id do usuário selecionado
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container" style={{ padding: "20px" }}>
      {Array.isArray(users) && users.length > 0 ? (
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
              <Card sx={{ margin: "10px" }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                  <Button
                    onClick={() => handleClickOpen(user.id)} 
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
                    Deletar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary">
          Nenhum usuário disponível.
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
