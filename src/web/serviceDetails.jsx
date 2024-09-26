import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Hook para pegar parâmetros da URL
import sheets from "../axios/axios"; // Arquivo do axios
import { Box, Typography, Grid } from "@mui/material";

function ServiceDetails() {
  const { id } = useParams(); // Pega o ID do serviço a partir da URL
  const [service, setService] = useState(null); // Estado para armazenar o serviço
  const [loading, setLoading] = useState(true); // Estado para mostrar loading

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await sheets.getServiceById(id); // Pega o serviço pelo ID
        setService(response.data.data); // Define os dados do serviço
        setLoading(false); // Desativa o estado de loading
      } catch (error) {
        console.error("Erro ao buscar detalhes do serviço", error);
        setLoading(false); // Mesmo em caso de erro, desativa o estado de loading
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>; // Exibe carregando enquanto os dados são buscados
  }

  if (!service) {
    return <p>Serviço não encontrado</p>; // Exibe mensagem se o serviço não for encontrado
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="95vh"
    >
      <Box
        width="80%"
        maxWidth="900px"
        border="3px solid #BFBFBF"
        borderRadius="15px"
        minHeight="450px"
        paddingBottom="10px"
      >
        <Grid container spacing={2}>
          {/* Lado esquerdo com o nome e a descrição */}
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems={{ xs: "center", md: "flex-start" }}
              minHeight="325px"
              padding={{ xs: "20px", md: "50px" }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Poppins-Bold",
                  marginBottom: "20px",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                {service.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins-Regular",
                  color: "#A8A8A8",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                {service.description}
              </Typography>
            </Box>
          </Grid>

          {/* Lado direito vazio por enquanto */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100%",
              marginTop: "50px"
            }}
          >
            {/* Conteúdo vazio, pode ser preenchido depois */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ServiceDetails;
