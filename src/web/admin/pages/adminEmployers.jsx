import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, Modal } from "@mui/material";
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
    setSelectedEmployerId(null);
  };

  useEffect(() => {
    fetchEmployers();
  }, []);

  return (
    <div>
  <Box sx={{ display: "flex", flexDirection: "row", marginTop: "50px", justifyContent: "space-between", alignItems: "center", paddingRight: "140px" }}>
  <Typography sx={{ marginLeft: "140px", fontFamily: "Poppins-Bold", fontSize: "1.5rem" }}>
    Funcionários Administrativos 
  </Typography>
  <BoxCreateEmployer />
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
            Todos os Funcionários
          </Typography>

          {/* Cabeçalho */}
          <Grid container sx={{ marginBottom: "10px", borderBottom: "2px solid #000", paddingBottom: "10px" }}>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1" sx={{ fontFamily: "Poppins-Bold" }}>Nome</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1" sx={{ fontFamily: "Poppins-Bold" }}>Telefone</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="subtitle1" sx={{ fontFamily: "Poppins-Bold" }}>Cargo</Typography>
            </Grid>
          </Grid>

          {Array.isArray(employers) && employers.length > 0 ? (
            employers.map((employer) => (
              <Grid container key={employer.id} sx={{ marginBottom: "10px", borderBottom: "1px solid #D9D9D9", paddingBottom: "10px" }}>
                <Grid item xs={12} sm={4}>
                  <Typography sx={{ fontFamily: "Poppins-Regular" }}>{employer.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography sx={{ fontFamily: "Poppins-Regular", color: "text.secondary" }}>{employer.phone}</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography sx={{ fontFamily: "Poppins-Regular", color: "text.secondary" }}>{employer.position}</Typography>
                </Grid>
                <Grid item xs={12} sm={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    onClick={() => handleClickOpen(employer.id)}
                    sx={{
                      backgroundColor: "#EB389A",
                      color: "#FFF",
                      textTransform: "capitalize",
                      fontSize: "1rem",
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
              Nenhum funcionário disponível.
            </Typography>
          )}
        </Box>
      </Grid>

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
