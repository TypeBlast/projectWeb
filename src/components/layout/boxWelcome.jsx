import React from "react";
import { Typography, Button, Box, Grid } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import ImageBoxHome from "../../assets/images/imageBoxHome.png";

function BoxWelcome() {
  // Hook para verificar o tamanho da tela
  const isMediumScreen = useMediaQuery("(max-width: 980px)");

  return (
    <Box
      sx={{
        border: "1px solid #BFBFBF", // Borda acinzentada
        height: "230px",
        borderRadius: "10px", // Bordas arredondadas (opcional)
        display: "flex",
        flexDirection: "row",
        alignItems: "center", // Centraliza o conteúdo horizontalmente
        justifyContent: "center", // Centraliza o conteúdo verticalmente
        width: "80vw", // Usa 80% da largura da viewport
        maxWidth: "800px", // Máximo de 1000px
        margin: "auto", // Centraliza a caixa na página
        marginTop: "50px",
        position: "relative", // Necessário para a imagem se sobressair
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        {!isMediumScreen && (
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              flexDirection: "column",
              position: "relative", // Torna o Grid base para a imagem
            }}
          >
            <img
              src={ImageBoxHome}
              style={{
                width: "200px",
                height: "250px", // Aumenta a altura para se sobressair
                position: "absolute", // Faz a imagem sobressair
                top: "-50px", // Move a imagem para cima, fora da box
                zIndex: 1, // Garante que a imagem fique visível acima do Grid
              }}
              alt="Home"
            />
          </Grid>
        )}
        <Grid
          item
          xs={12} // Alterado para xs={12} quando em telas menores
          md={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Grid>
      </Grid>
    </Box>
  );
}

export default BoxWelcome;
