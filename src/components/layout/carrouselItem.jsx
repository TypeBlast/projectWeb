import React from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CarouselItem = ({ items, colors, images, handleClick, itemKey }) => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      overflow="auto"
      width="100%"
      maxWidth="900px"  // Diminuindo a largura máxima do carousel
      padding="20px 30px"  // Padding horizontal
      gap="20px"
      margin="0px 20px"
      sx={{
        "&::-webkit-scrollbar": {
          height: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#EB389A",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#C01374", // Cor ao passar o mouse sobre o "polegar"
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#F1F1F1", // Cor do fundo da barra de rolagem
        },
      }}
    >
      {items.map((item, index) => (
        <Button
          key={item[itemKey]}
          variant="contained"
          sx={{
            minWidth: "200px",  // Diminuindo a largura mínima dos botões
            height: "250px",
            backgroundColor: colors[index % colors.length],
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            fontFamily: "Poppins-Bold",
            textTransform: "unset",
            fontSize: "1.5rem",
            "&:hover": {
              backgroundColor: "#EB389A",
              transform: "scale(1.05)",
            },
          }}
          onClick={() => handleClick(item[itemKey])}
        >
          <img
            src={images[index % images.length]}
            alt={item.name}
            style={{ width: "150px", height: "150px" }}
          />
          {item.name}
        </Button>
      ))}
    </Box>
  );
};

export default CarouselItem;
