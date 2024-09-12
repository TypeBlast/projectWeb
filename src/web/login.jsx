import React, { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

//import images
import imageLogin from "../assets/images/imageLogin.png";

//import email and password inputs
import InputEmail from "../components/inputs/inputEmail";
import InputPassword from "../components/inputs/inputPassword";

//import FontAwesomeIcon for Google login button
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

// Import sheets for API requests
import sheets from "../axios/axios"; // Caminho ajustado conforme necessário

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para o alerta de erro
  const [success, setSuccess] = useState(""); // Estado para o alerta de sucesso

  // Hook para verificar o tamanho da tela
  const isMediumScreen = useMediaQuery("(max-width: 980px)");
  const navigate = useNavigate();

  // Função para navegação
  const handleNavigation = (path) => {
    navigate(path); // Navega para o caminho especificado
  };

  // Função de login
  const handleLogin = async () => {
    try {
      console.log("Tentando logar com:", email, password); // Adicione um log para verificar os dados
      const loginData = { email, password };
      const response = await sheets.logUser(loginData);
      console.log("Resposta do servidor:", response.data); // Log da resposta do servidor

      if (response.status === 201) {
        navigate("/home");
      }
    }  catch (error) {
      setSuccess(""); // Limpa qualquer sucesso anterior
      // Verifica se existe uma mensagem específica da API ou exibe um erro padrão
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Erro ao realizar cadastro.");
      }
    }
  };

  return (
    <Grid container style={{ height: "100vh" }}>
      {/* Nome no canto superior esquerdo que leva à página inicial */}
      <Button
        onClick={() => handleNavigation("/")}
        sx={{
          position: "absolute",
          fontFamily: "MonumentExtend-UltraBold",
          color: "#FFF",
          marginTop: 3,
          marginLeft: 5,
          fontSize: "1.2rem",
          backgroundColor: "transparent",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "transparent",
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
            width: isMediumScreen ? "90%" : "60%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Grid container sx={{ height: "100%" }}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRight: isMediumScreen ? "none" : "1px solid #ccc",
                height: "100%",
                flexDirection: "column",
                padding: 2,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins-Bold",
                  fontSize: "1.5rem",
                  marginTop: "20px",
                }}
              >
                Entre em sua conta!
              </Typography>

              {/* Input de email e senha */}
              <Box
                sx={{
                  marginTop: "20px",
                  width: "100%",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <InputEmail
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>

              <InputPassword
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Stack sx={{ width: "100%", height: 20 }} spacing={2}>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
              </Stack>

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
                    backgroundColor: "#FF8DBA",
                    color: "#FFF",
                  },
                }}
                onClick={handleLogin}
              >
                Entrar
              </Button>

              {/* Outras opções de login e registro */}
              <Button
                sx={{
                  fontFamily: "Poppins-Bold",
                  textTransform: "capitalize",
                  color: "#E01483",
                  marginTop: "10px",
                }}
                onClick={() => handleNavigation("/register")}
              >
                Criar nova conta
              </Button>
            </Grid>

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
                  src={imageLogin}
                  style={{
                    width: 250,
                    height: 250,
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
                  Bem-vindo novamente, sentimos sua falta!
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Grid>

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
