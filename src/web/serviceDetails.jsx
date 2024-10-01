import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import sheets from "../axios/axios"; 
import { Box, Typography, Grid, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

function ServiceDetails() {
  const { id } = useParams(); 
  const [service, setService] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]); 
  const [selectedPet, setSelectedPet] = useState(""); 

  // Pegar o token do usuário, que pode estar no localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await sheets.getServiceById(id); 
        setService(response.data.data);
        setLoading(false); 
      } catch (error) {
        console.error("Erro ao buscar detalhes do serviço", error);
        setLoading(false);
      }
    };

    // Função atualizada para buscar todos os pets
    const fetchPets = async () => {
      try {
        const response = await sheets.getAllPets(); // Chamada para buscar todos os pets
        setPets(response.data); // Define a lista de pets
      } catch (error) {
        console.error("Erro ao buscar pets", error);
      }
    };

    fetchService();
    fetchPets(); // Buscar a lista de pets do usuário
  }, [id]);

  const handlePetChange = (event) => {
    setSelectedPet(event.target.value); // Atualiza o pet selecionado
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!service) {
    return <p>Serviço não encontrado</p>;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="95vh">
      <Box width="80%" maxWidth="900px" border="3px solid #BFBFBF" borderRadius="15px" minHeight="450px" paddingBottom="10px">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems={{ xs: "center", md: "flex-start" }} minHeight="325px" padding={{ xs: "20px", md: "50px" }}>
              <Typography variant="h4" sx={{ fontFamily: "Poppins-Bold", marginBottom: "20px", textAlign: { xs: "center", md: "left" } }}>
                {service.name}
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: "Poppins-Regular", color: "#A8A8A8", textAlign: { xs: "center", md: "left" } }}>
                {service.description}
              </Typography>
            </Box>
          </Grid>

          {/* Lado direito - Select com lista de pets */}
          <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100%", marginTop: "50px" }}>
            <FormControl fullWidth>
              <InputLabel id="pet-select-label">Selecione um Pet</InputLabel>
              <Select
                labelId="pet-select-label"
                id="pet-select"
                value={selectedPet}
                onChange={handlePetChange}
                label="Selecione um Pet"
              >
                {pets.data && pets.data.length > 0 ? (
                  pets.data.map((pet) => (
                    <MenuItem key={pet.id} value={pet.id}>
                      {pet.name} 
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    Nenhum pet disponível
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ServiceDetails;
