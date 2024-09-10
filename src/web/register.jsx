import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";

import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";


//import images
import imageRegister from "../assets/images/imageRegister.png";

//import email
import InputEmail from "../components/inputs/inputEmail";
import InputPassword from "../components/inputs/inputPassword";
import InputCPF from "../components/inputs/inputCPF";
import InputName from "../components/inputs/inputName";
import InputPhone from "../components/inputs/inputPhone";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons"; // Corrigido para o pacote correto

function Login() {
  // Hook para verificar o tamanho da tela
  const isMediumScreen = useMediaQuery("(max-width: 980px)");

  const navigate = useNavigate();

  // Função para navegação
  const handleNavigation = (path) => {
    navigate(path); // Navega para o caminho especificado
  };
  return (
    <Grid container style={{ height: "100vh" }}>
      {/* Nome no canto superior esquerdo */}
      <Button
        onClick={() => handleNavigation("/")} // Navega para a página inicial
        sx={{
          position: "absolute",
          fontFamily: "MonumentExtend-UltraBold",
          color: "#FFF",
          marginTop: 3,
          marginLeft: 5,
          fontSize: "1.2rem",
          backgroundColor: "transparent", // Remove o fundo padrão do botão
          textTransform: "none", // Remove a transformação de texto padrão
          "&:hover": {
            backgroundColor: "transparent", // Remove o fundo ao passar o mouse
          },
        }}
      >
        PetExpress
      </Button>

      {/* Metade esquerda da tela */}
      <Grid
        item
        xs={12}
        md={6}
        style={{
          backgroundColor: "#F25CAE",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Box centralizada no meio da tela */}
        <Box
          sx={{
            backgroundColor: "white",
            height: 450,
            borderRadius: "30px",
            boxShadow: 3,
            width: isMediumScreen ? "90%" : "60%", // Ajusta a largura da box para telas menores
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Centraliza vertical e horizontalmente
          }}
        >
          <Grid container sx={{ height: "100%" }}>
            {!isMediumScreen && (
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  flexDirection: "column",
                  padding: 2,
                }}
              >
                <img
                  src={imageRegister}
                  style={{
                    width: 300,
                    height: 225,
                    marginTop: 40,
                  }}
                />
                <Typography
                  sx={{
                    marginBottom: 10,
                    fontFamily: "Poppins-Regular",
                    width: 200,
                    textAlign: "center",
                  }}
                >
                  Cadastre-se e desfrute de nossos serviços!
                </Typography>
              </Grid>
            )}

            <Grid
              item
              xs={12} // Alterado para xs={12} quando em telas menores
              md={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderLeft: isMediumScreen ? "none" : "1px solid #ccc", // Divisória à esquerda
                height: "100%",
                flexDirection: "column",
                padding: 2,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins-Bold",
                  fontSize: "1.5rem"  
                }}
              >
                Crie sua conta!
              </Typography>

              {/* Ajuste da margem superior do InputEmail */}
              <Box
                sx={{
                  marginTop: "5px",
                  width: "100%",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <InputCPF />
                <InputName />
                <InputEmail />
                <InputPhone />
                <InputPassword />
              </Box>
              <Button
                sx={{
                  width: "275px",
                  height: "50px",
                  backgroundColor: "#EB389A",
                  borderRadius: "9px",
                  fontFamily: "Poppins-Bold",
                  color: "#FFF",
                  textTransform: "capitalize",
                  fontSize: "1.3rem",
                  marginTop: "30px",
                  "&:hover": {
                    backgroundColor: "#FF8DBA", // Cor de fundo ao passar o mouse
                    color: "#FFF", // Cor do texto ao passar o mouse
                  },
                }}
              >
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* Grid direita que só aparece em telas maiores */}
      {!isMediumScreen && (
        <Grid
          item
          xs={12}
          md={6}
          style={{
            backgroundColor: "#FFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}
    </Grid>
  );
}

export default Login;
