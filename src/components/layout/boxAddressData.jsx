import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, Button, Modal } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faXmark,
  faTrash,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios/axios";
import InputComplement from "../inputs/inputComplement";
import InputNumber from "../inputs/inputNumber";
import InputCep from "../inputs/inputCEP";
import InputState from "../inputs/inputState"; 
import InputCity from "../inputs/inputCity"; 

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
          axios.getAddressByUser(),
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
      const addressData = {
        complement,
        number,
        cep,
        state_id: stateId,
        city_id: cityId,
      };

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

      const response = await axios.getAddressByUser();
      setAddresses(response.data.data);

      handleClose();
    } catch (error) {
      console.error(
        "Erro ao salvar endereço:",
        error.response?.data || error.message
      );
      setError(error.response?.data?.message || "Erro ao realizar login.");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await axios.deleteAddress(addressId);
      setSuccess("Endereço deletado com sucesso!");

      const response = await axios.getAddressByUser();
      setAddresses(response.data.data);

      setConfirmDeleteOpen(false);
    } catch (error) {
      console.error(
        "Erro ao deletar endereço:",
        error.response?.data || error.message
      );
      setError("Erro ao deletar endereço. Tente novamente.");
      setConfirmDeleteOpen(false);
    }
  };

  const formatCEP = (cep) => cep.replace(/(\d{5})(\d{3})/, "$1-$2");

  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "50px", justifyContent: "center" }}
      >
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
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Poppins-Bold",
              marginBottom: "20px",
              fontSize: "1.25rem",
              textAlign: "start",
            }}
          >
            Endereços Salvos
          </Typography>

          {addresses.length === 0 ? (
            <Typography textAlign="flex-start">
              Nenhum endereço cadastrado.
            </Typography>
          ) : (
            addresses.map((address) => (
              <Grid
                container
                key={address.id}
                sx={{
                  marginBottom: "20px",
                  borderBottom: "1px solid #D9D9D9", 
                  paddingBottom: "10px",
                  cursor: "pointer", 
                }}
                onClick={() => handleEditAddress(address)} 
              >
                <Grid item xs={8}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      style={{ marginRight: "8px", color: "#D9D9D9" }}
                    />
                    <Typography
                      sx={{ fontFamily: "Poppins-Regular", fontSize: "0.9rem" }}
                    >
                      {`${formatCEP(address.cep)} - ${address.complement}`}
                    </Typography>
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={4}
                  container
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleEditAddress(address);
                    }}
                    sx={{
                      padding: "0",
                      minWidth: "0",
                      color: "#D9D9D9",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPen}
                      style={{ fontSize: "1.8rem" }}
                    />
                  </Button>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      setCurrentAddress(address);
                      setConfirmDeleteOpen(true);
                    }}
                    sx={{
                      padding: "0",
                      minWidth: "0",
                      color: "#D9D9D9",
                      marginLeft: "8px",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ fontSize: "1.8rem" }}
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
              maxWidth: "300px",
              width: "100%",
              backgroundColor: "#EB389A",
              marginTop: "20px",
              fontFamily: "Poppins-Bold",
              color: "#FFF",
              textTransform: "capitalize",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#D5006D",
                transform: "scale(1.05)",
              },
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            Adicionar Novo Endereço
          </Button>
        </Box>
      </Grid>

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
            {editMode ? "Editar Endereço" : "Adicionar Endereço"}
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <InputComplement
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />
            <InputNumber
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <InputCep value={cep} onChange={(e) => setCep(e.target.value)} />
            <InputState
              states={states}
              value={stateId}
              onChange={(e) => setStateId(e.target.value)}
            />
            <InputCity
              cities={cities}
              value={cityId}
              onChange={(e) => setCityId(e.target.value)}
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
                width: "80%",
                maxWidth: "300px",
                fontFamily: "Poppins-Bold",
                "&:hover": {
                  backgroundColor: "#D5006D",
                },
              }}
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <Box sx={modalStyle}>
          <Typography
            sx={{
              fontFamily: "Poppins-Bold",
              fontSize: "1.2rem",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Tem certeza que deseja deletar este endereço?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "20px",
            }}
          >
            <Button
              onClick={() => handleDeleteAddress(currentAddress.id)}
              variant="contained"
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
              Sim
            </Button>
            <Button
              onClick={() => setConfirmDeleteOpen(false)}
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
              Não
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default BoxAddress;
