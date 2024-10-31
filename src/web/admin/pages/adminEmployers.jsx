import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, Modal } from "@mui/material";
import axios from "../../../axios/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import BoxCreateEmployer from "../components/layout/boxCreateEmployers";
import InputNameEmployer from "../components/inputs/inputNameEmployer";
import InputPosition from "../components/inputs/inputPosition";
import InputService from "../components/inputs/inputService_id";
import InputPhoneEmployer from "../components/inputs/inputPhoneEmployer";

function AdminEmployers() {
  const [employers, setEmployers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [selectedEmployerId, setSelectedEmployerId] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updatedPosition, setUpdatedPosition] = useState("");
  const [updatedService, setUpdatedService] = useState("");
  const [services, setServices] = useState([]);

  const fetchEmployers = async () => {
    try {
      const response = await axios.getAllEmployers();
      setEmployers(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.getAllServices();
      setServices(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    }
  };

  const handleEditEmployer = (employer) => {
    setSelectedEmployer(employer);
    setUpdatedName(employer.name);
    setUpdatedPhone(employer.phone);
    setUpdatedPosition(employer.position);
    setUpdatedService(employer.service_id);
    fetchServices();
    setOpenModal(true);
  };

  const handleUpdateEmployer = async () => {
    try {
      await axios.updateEmployer(selectedEmployer.id, {
        name: updatedName,
        phone: updatedPhone,
        position: updatedPosition,
        service_id: updatedService,
      });
      setOpenModal(false);
      fetchEmployers();
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
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

  const handleClickOpenConfirm = (employerId) => {
    setSelectedEmployerId(employerId);
    setOpenConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
    setSelectedEmployerId(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEmployer(null);
  };

  useEffect(() => {
    fetchEmployers();
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "50px", paddingRight: "140px" }}>
        <Typography sx={{ marginLeft: "140px", fontFamily: "Poppins-Bold", fontSize: "1.5rem" }}>Funcionários Administrativos</Typography>
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
          <Typography variant="h6" sx={{ fontFamily: "Poppins-Bold", marginBottom: "20px" }}>Todos os Funcionários</Typography>

          <Grid container sx={{ marginBottom: "10px", borderBottom: "2px solid #000", paddingBottom: "10px" }}>
            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle1" sx={{ fontFamily: "Poppins-Bold" }}>Nome</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle1" sx={{ fontFamily: "Poppins-Bold" }}>Telefone</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="subtitle1" sx={{ fontFamily: "Poppins-Bold" }}>Cargo</Typography>
            </Grid>
          </Grid>

          {employers.length > 0 ? (
            employers.map((employer) => (
              <Grid container key={employer.id} sx={{ marginBottom: "10px", borderBottom: "1px solid #D9D9D9", paddingBottom: "10px" }}>
                <Grid item xs={12} sm={3}>
                  <Typography sx={{ fontFamily: "Poppins-Regular" }}>{employer.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography sx={{ fontFamily: "Poppins-Regular", color: "text.secondary" }}>{employer.phone}</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography sx={{ fontFamily: "Poppins-Regular", color: "text.secondary" }}>{employer.position}</Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button onClick={() => handleEditEmployer(employer)} sx={{ backgroundColor: "#EB389A", color: "#FFF", textTransform: "capitalize", fontSize: "1rem", "&:hover": { backgroundColor: "#D5006D" } }}>
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                  <Button onClick={() => handleClickOpenConfirm(employer.id)} sx={{ backgroundColor: "#EB389A", color: "#FFF", textTransform: "capitalize", fontSize: "1rem", marginLeft: "10px", "&:hover": { backgroundColor: "#D5006D" } }}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </Grid>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">Nenhum funcionário disponível.</Typography>
          )}
        </Box>
      </Grid>

      {/* Modal de Edição de Funcionário */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ width: 400, bgcolor: "background.paper", borderRadius: "8px", boxShadow: 24, p: 4, margin: "auto", marginTop: "100px" }}>
          <Typography variant="h6" component="h2" sx={{ textAlign: "center", marginBottom: "20px" }}>Editar Funcionário</Typography>
          <InputNameEmployer value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
          <InputPhoneEmployer value={updatedPhone} onChange={(e) => setUpdatedPhone(e.target.value)} />
          <InputPosition value={updatedPosition} onChange={(e) => setUpdatedPosition(e.target.value)} />
          <InputService services={services} selectedService={updatedService} handleServiceChange={(e) => setUpdatedService(e.target.value)} />

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
            <Button onClick={handleUpdateEmployer} sx={{ width: "250px",
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
      <Modal open={openConfirmModal} onClose={handleCloseConfirmModal}>
        <Box sx={{ width: 400, bgcolor: "background.paper", borderRadius: "8px", boxShadow: 24, p: 4, margin: "auto", marginTop: "100px" }}>
          <Typography variant="h6" component="h2" sx={{ textAlign: "center", marginBottom: "20px" }}>Confirmação de Exclusão</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", marginBottom: "20px" }}>Deseja realmente excluir este funcionário?</Typography>

          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "20px" }}>
            <Button onClick={handleCloseConfirmModal} sx={{ width: "250px",
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
            <Button onClick={handleDeleteEmployer} sx={{ width: "250px",
                backgroundColor: "#EB389A",
                marginTop: "20px",
                fontFamily: "Poppins-Bold",
                color: "#FFF",
                textTransform: "capitalize",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#D5006D",} }}>
              Confirmar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AdminEmployers;
