import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import sheets from "../axios/axios"; // Caminho do arquivo axios.js
import imageServices from "../assets/images/imageServices.png";
import imageConsults from "../assets/images/imageConsults.png";
import imageUnhas from "../assets/images/imageCortarUnhas.png";
import imageVacina from "../assets/images/imageVacinas.png";
import imageTosa from "../assets/images/imageTosa.png";

const colors = ["#BA60E8", "#FF6561", "#5BF165", "#FDFF61"];

const images = [
  imageServices,
  imageUnhas,
  imageConsults,
  imageVacina,
  imageTosa,
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
      sx={{ marginTop: "50px" }} // Adiciona marginTop de 50px
    >
      <Box
        width="80%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="50px"
        paddingBottom="50px"
        sx={{ 
          overflowY: "auto", // Garante que o conteúdo respeite o header
          /* Estilização da barra de rolagem */
          "&::-webkit-scrollbar": {
            width: "8px", // Largura da barra de rolagem
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc", // Cor do "polegar" da barra de rolagem
            borderRadius: "10px", // Borda arredondada
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#A8A8A8", // Cor ao passar o mouse sobre o "polegar"
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#F1F1F1", // Cor do fundo da barra de rolagem
          },
        }}
      >
        {services.map((service, index) => (
          <Button
            key={service.id}
            variant="contained"
            fullWidth
            sx={{
              height: "200px",
              minHeight: "200px", // Redefine a altura mínima
              backgroundColor: colors[index % colors.length],
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start", // Alinha o conteúdo do botão à esquerda
              textAlign: "left", // Garante que o texto também fique alinhado à esquerda
              paddingLeft: "20px", // Adiciona padding para espaçamento interno
              fontFamily: "Poppins-Bold",
              textTransform: "unset",
              fontSize: "1.7rem",
              gap: "15%",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#EB389A", // Cor de fundo ao passar o mouse (hover)
                color: "#FFF", // Cor do texto ao passar o mouse
                transform: "scale(1.05)",
              },
            }}
            onClick={() => handleServiceClick(service.id)} // Adiciona o evento de clique
          >
            {/* Usando imagem variada conforme o índice */}
            <img
              src={images[index % images.length]}
              alt={`${service.name} logo`}
              style={{
                width: "175px",
                height: "175px",
                marginRight: "20px",
                marginLeft: "50px",
              }} // Adiciona margem à direita
            />
            {service.name}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default Services;
