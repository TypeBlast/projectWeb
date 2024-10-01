import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, Button, Modal } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios/axios";
import InputComplement from "../inputs/inputComplement";
import InputNumber from "../inputs/inputNumber";
import InputCep from "../inputs/inputCep";
import InputState from "../inputs/inputState"; // Componente para selecionar o estado
import InputCity from "../inputs/inputCity"; // Componente para selecionar a cidade

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

function BoxAddress() {
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({});
  const [complement, setComplement] = useState("");
  const [number, setNumber] = useState("");
  const [cep, setCep] = useState("");
  const [stateId, setStateId] = useState("");
  const [cityId, setCityId] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchStatesAndAddresses = async () => {
      try {
        const [statesResponse, addressesResponse] = await Promise.all([
          axios.getAllStates(),
          axios.getAllAddresses(),
        ]);
        setStates(statesResponse.data.data);
        setAddresses(addressesResponse.data.data);
      } catch (error) {
        console.error("Erro ao buscar estados ou endereços:", error);
        setError("Erro ao buscar dados. Tente novamente.");
      }
    };

    fetchStatesAndAddresses();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!stateId) return;
      try {
        const response = await axios.getAllCitiesByStateId(stateId);
        setCities(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
        setError("Erro ao buscar cidades. Tente novamente.");
      }
    };

    fetchCities();
  }, [stateId]);

  const handleOpen = () => {
    setError("");
    setSuccess("");
    setComplement("");
    setNumber("");
    setCep("");
    setStateId("");
    setCityId("");
    setCities([]);
    setOpen(true);
    setEditMode(false);
  };

  const handleEditAddress = (address) => {
    setCurrentAddress(address);
    setComplement(address.complement);
    setNumber(address.number);
    setCep(address.cep);
    setStateId(address.stateId);
    setCityId(address.cityId);
    setOpen(true);
    setEditMode(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentAddress({});
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    try {
      const addressData = { complement, number, cep, state_id: stateId, city_id: cityId };

      if (!number || !cep || !stateId || !cityId) {
        setError("Todos os campos obrigatórios devem ser preenchidos.");
        return;
      }

      if (editMode) {
        await axios.updateAddress(currentAddress.id, addressData);
        setSuccess("Endereço atualizado com sucesso!");
      } else {
        await axios.createAddress(addressData);
        setSuccess("Endereço cadastrado com sucesso!");
      }

      // Atualiza os endereços após a edição ou adição
      const response = await axios.getAllAddresses();
      setAddresses(response.data.data);
      
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar endereço:", error.response?.data || error.message);
      setError("Erro ao salvar endereço. Tente novamente.");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await axios.deleteAddress(addressId);
      setSuccess("Endereço deletado com sucesso!");
      
      // Atualiza os endereços após a deleção
      const response = await axios.getAllAddresses();
      setAddresses(response.data.data);
      
      setConfirmDeleteOpen(false);
    } catch (error) {
      console.error("Erro ao deletar endereço:", error.response?.data || error.message);
      setError("Erro ao deletar endereço. Tente novamente.");
      setConfirmDeleteOpen(false);
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
          <Typography variant="h6" sx={{ fontFamily: "Poppins-Bold", marginBottom: "20px" }}>
            Endereços Salvos
          </Typography>
          {addresses.length === 0 ? (
            <Typography>Nenhum endereço cadastrado.</Typography>
          ) : (
            addresses.map((address) => (
              <Grid container key={address.id} sx={{ marginBottom: "10px" }}>
                <Grid item xs={8}>
                  <Typography>{`${address.complement}, ${address.number}, ${address.cep}`}</Typography>
                </Grid>
                <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button onClick={() => handleEditAddress(address)}>
                    <FontAwesomeIcon icon={faPen} style={{ fontSize: "1rem", color: "#D9D9D9" }} />
                  </Button>
                  <Button onClick={() => { setCurrentAddress(address); setConfirmDeleteOpen(true); }} sx={{ marginLeft: "10px" }}>
                    <FontAwesomeIcon icon={faTrash} style={{ fontSize: "1rem", color: "#D9D9D9" }} />
                  </Button>
                </Grid>
              </Grid>
            ))
          )}
          {/* Botão Adicionar Novo Endereço com estilo atualizado */}
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
            }}
          >
            Adicionar Novo Endereço
          </Button>
        </Box>
      </Grid>

      {/* Modal para Adicionar/Editar Endereço */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Button onClick={handleClose} sx={{ position: "absolute", top: 10, right: 25, minWidth: "auto" }}>
            <FontAwesomeIcon icon={faXmark} style={{ color: "#BFBFBF", fontSize: "1.5rem" }} />
          </Button>
          <Typography sx={{ fontFamily: "Poppins-Bold", fontSize: "1.3rem", marginTop: "30px", textAlign: "center" }}>
            {editMode ? "Editar Endereço" : "Adicionar Endereço"}
          </Typography>
          {error && <Typography sx={{ color: "red", textAlign: "center" }}>{error}</Typography>}
          {success && <Typography sx={{ color: "green", textAlign: "center" }}>{success}</Typography>}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <InputComplement value={complement} onChange={(e) => setComplement(e.target.value)} />
            <InputNumber value={number} onChange={(e) => setNumber(e.target.value)} />
            <InputCep value={cep} onChange={(e) => setCep(e.target.value)} />
            <InputState states={states} value={stateId} onChange={(e) => setStateId(e.target.value)} />
            <InputCity cities={cities} value={cityId} onChange={(e) => setCityId(e.target.value)} />

            {/* Botão Salvar com estilo atualizado */}
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                width: "300px",
                backgroundColor: "#EB389A",
                marginTop: "25px",
                fontFamily: "Poppins-Bold",
                color: "#FFF",
                textTransform: "capitalize",
                fontSize: "1.3rem",
                alignSelf: "center", // Centraliza o botão
              }}
            >
              {editMode ? "Salvar Alterações" : "Salvar"}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal de Confirmação de Deleção */}
      <Modal open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <Box sx={modalStyle}>
          <Typography sx={{ fontFamily: "Poppins-Bold", fontSize: "1.3rem", textAlign: "center" }}>
            Tem certeza que deseja deletar este endereço?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: "20px" }}>
            <Button onClick={() => handleDeleteAddress(currentAddress.id)} variant="contained" color="error">
              Deletar
            </Button>
            <Button onClick={() => setConfirmDeleteOpen(false)} variant="contained" color="inherit">
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default BoxAddress;