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
import axios from "../../../axios/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faTrash } from "@fortawesome/free-solid-svg-icons"; 
import BoxCreateEmployer from "../components/layout/boxCreateEmployers";

function AdminEmployers() {
  const [employers, setEmployers] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedEmployerId, setSelectedEmployerId] = useState(null);

  const fetchEmployers = async () => {
    try {
      const response = await axios.getAllEmployers(); 
      const employersData = response.data.data;
      setEmployers(employersData);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      setEmployers([]);
    }
  };

  const handleDeleteEmployer = async () => {
    try {
      if (selectedEmployerId) {
        await axios.deleteEmployer(selectedEmployerId); 
        fetchEmployers(); 
        handleCloseConfirmModal(); 
      }
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error);
    }
  };

  const handleClickOpen = (employerId) => {
    setSelectedEmployerId(employerId);
    setOpenConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
    setSelectedEmployerId(null); // Limpa o id do funcionário selecionado
  };

  useEffect(() => {
    fetchEmployers();
  }, []);

  return (
    <div className="container" style={{ padding: "20px" }}>

      <BoxCreateEmployer/>
      {Array.isArray(employers) && employers.length > 0 ? (
        <Grid container spacing={2}>
          {employers.map((employer) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={employer.id}>
              <Card sx={{ margin: "10px" }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {employer.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Telefone: {employer.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cargo: {employer.position}
                  </Typography>
                  <Button
                    onClick={() => handleClickOpen(employer.id)} 
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
                    Demitir Funcionário
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary">
          Nenhum funcionário disponível.
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
            Você tem certeza que deseja excluir este funcionário?
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
              onClick={handleDeleteEmployer}
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

export default AdminEmployers;
