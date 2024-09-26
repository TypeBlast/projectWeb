import React, { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons"

// Importe a configuração do Firebase
import { auth, provider, signInWithPopup } from "../firebaseConfig"; 

import imageLogin from "../assets/images/imageLogin.png";
import InputEmail from "../components/inputs/inputEmail";
import InputPassword from "../components/inputs/inputPassword";
import sheets from "../axios/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const isMediumScreen = useMediaQuery("(max-width: 980px)");
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogin = async () => {
    try {
      const loginData = { email, password };
      const response = await sheets.logUser(loginData);
  
      if (response.status === 201) {
        const { user, token } = response.data; 
  
        // Verifique se os campos CPF e phone estão presentes
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        console.log(token)

  
        navigate("/home");
      }
    } catch (error) {
      setSuccess("");
      setError(error.response?.data?.message || "Erro ao realizar login.");
    }
  };
  // Função de login com o Google
  const handleGoogleLogin = async () => {
    try {
        // Configura para que o popup force a seleção de conta
        provider.setCustomParameters({
            prompt: 'select_account',
        });

        // Faz o login com o Google
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Envia o e-mail para o backend
        const loginData = { email: user.email }; // Envia apenas o e-mail

        const response = await sheets.logUser(loginData); // Chama a mesma função de login

        if (response.status === 200) {
            const { user, token } = response.data; 
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            console.log(token);
            navigate("/home"); // Redireciona para a página Home
        }
    } catch (error) {
        console.error("Erro ao realizar login com o Google:", error);
        setError(error.response?.data?.message || "Erro ao realizar login com o Google.");
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
              <Stack sx={{ width: "100%", height: 40, textAlign:'center' }} spacing={2}>
                {error && <Alert variant="outlined" severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
              </Stack>

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

              {/* Botão de login com o Google */}
              <Button
                sx={{
                  border: "1px solid #D9D9D9",
                  borderRadius: "7px",
                  fontFamily: "Poppins-Regular",
                  fontSize: "0.9rem",
                  textTransform: "unset",
                  width: "275px",
                  color: "#000",
                  marginTop: "20px",
                }}
                onClick={handleGoogleLogin}
              >
                <FontAwesomeIcon
                  icon={faGoogle}
                  style={{
                    fontSize: "15px",
                    color: "#F25CAE",
                    marginRight: "10px",
                  }}
                />
                Continuar com o Google
              </Button>

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
