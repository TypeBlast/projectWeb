import React, { useEffect, useState } from "react";
import { Button, Box, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import sheets from "../axios/axios";
import imageServices from "../assets/images/imageServices.png";
import imageConsults from "../assets/images/imageConsults.png";
import imageUnhas from "../assets/images/imageCortarUnhas.png";
import imageVacina from "../assets/images/imageVacinas.png";
import imageTosa from "../assets/images/imageTosa.png";

// Defina as cores e imagens
const colors = ['#BA60E8', '#FF4C4C', '#5BF165', '#FF8C2D', '#4C9FFF'];
const images = [
  imageServices,
  imageUnhas,
  imageConsults,
  imageVacina,
  imageTosa,
];

function Services() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  // Usando media query para verificar a largura da tela
  const isMd = useMediaQuery("(min-width:960px)");
  const isSm = useMediaQuery("(min-width:600px)"); // Responsividade para telas sm (600px)
  const isXs = useMediaQuery("(max-width:599px)"); // Responsividade para telas xs (menor que 600px)

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
    navigate(`/services/${id}`);
  };

  // Lógica para definir o marginTop dependendo do breakpoint
  let marginTop = "80px"; // Padrão para xs
  if (isSm && !isMd) {
    // Para telas sm (600px - 959px)
    marginTop = "80px";
  } else if (isMd) {
    // Para telas md e acima (960px+)
    marginTop = "80px";
  }

  return (
    <Box
      className="container"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        marginTop: marginTop, // Ajuste dinâmico do marginTop com base nos breakpoints
        width: "100%", // Garantir que o conteúdo ocupe toda a largura
      }}
    >
      <Box
        width="80%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="50px"
        paddingBottom="50px"
      >
        {services.map((service, index) => (
          <Button
            key={service.id}
            variant="contained"
            fullWidth
            sx={{
              height: "200px",
              minHeight: "200px",
              backgroundColor: colors[index % colors.length],
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: isMd ? "flex-start" : "center",
              textAlign: "left",
              paddingLeft: isMd ? "20px" : "0",
              fontFamily: "Poppins-Bold",
              textTransform: "unset",
              fontSize: "1.7rem",
              gap: "15%",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#EB389A",
                color: "#FFF",
                transform: "scale(1.05)",
              },
            }}
            onClick={() => handleServiceClick(service.id)}
          >
            {isMd && (
              <img
                src={images[index % images.length]}
                alt={`${service.name} logo`}
                style={{
                  width: "175px",
                  height: "175px",
                  marginRight: "20px",
                  marginLeft: "50px",
                }}
              />
            )}
            {service.name}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default Services;
