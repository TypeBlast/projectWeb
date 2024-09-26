import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import sheets from "../axios/axios"; // Caminho do arquivo axios.js

const colors = [
  '#3f51b5',
  '#f44336',
  '#4caf50',
  '#ff9800',
  '#9c27b0',
];

function Services() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate(); // Usa o hook para navegação

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await sheets.getAllServices();
        setServices(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar serviços", error);
      }
    };

    fetchServices();
  }, []);

  const handleServiceClick = (id) => {
    navigate(`/services/${id}`); // Navega para a página de detalhes do serviço
  };

  return (
    <Box 
      className="container" 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Serviços Disponíveis
      </Typography>
      <Box 
        width="80%" 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        gap={2}
      >
        {services.map((service, index) => (
          <Button 
            key={service.id} 
            variant="contained" 
            fullWidth 
            sx={{ 
              height: '60px', 
              backgroundColor: colors[index % colors.length],
              color: '#fff'
            }}
            onClick={() => handleServiceClick(service.id)} // Adiciona o evento de clique
          >
            {service.name}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default Services;
