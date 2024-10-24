import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import sheets from "../axios/axios";
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

// Defina o breakpoint manualmente
const BREAKPOINT_MD = 960; // Largura do breakpoint para md

function Services() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const isMd = window.innerWidth >= BREAKPOINT_MD; // Verifica se a largura da janela é maior que o breakpoint

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

  return (
    <Box
      className="container"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{ marginTop: "50px" }}
    >
      <Box
        width="80%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="50px"
        paddingBottom="50px"
        sx={{
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#EB389A",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#C01374",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#F1F1F1",
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
