import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

// Import images
import imageRegister from "../assets/images/imageRegister.png";

// Import email, password, CPF, name, and phone inputs
import InputEmail from "../components/inputs/inputEmail";
import InputPassword from "../components/inputs/inputPassword";
import InputCPF from "../components/inputs/inputCPF";
import InputName from "../components/inputs/inputName";
import InputPhone from "../components/inputs/inputPhone";

// Import sheets for API requests
import sheets from "../axios/axios"; // Ajuste o caminho conforme necessário

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Register() {
  const isMediumScreen = useMediaQuery("(max-width: 980px)");
  const navigate = useNavigate();
  const location = useLocation();

  // Estado para os inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(""); 

  // Verifica se o usuário veio de um login com Google
  const isGoogleLogin = !!location.state?.email; // Verifica se o e-mail está pré-preenchido

  // UseEffect para definir os valores iniciais dos inputs se vier de um login com Google
  useEffect(() => {
    if (location.state) {
      const { email, name } = location.state;
      setEmail(email || "");
      setName(name || "");
    }
  }, [location.state]);

  // Função de cadastro
  const handleRegister = async () => {
    if (!email || !password || !cpf || !name || !phone) {
      setError("Preencha todos os campos.");
      return;
    }
    try {
      const registerData = { email, password, cpf, name, phone };
      const response = await sheets.postUser(registerData);
      
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      setSuccess(""); 
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Erro ao realizar cadastro.");
      }
    }
  };

  return (
    <Grid container style={{ height: "100vh" }}>
      <Button
        onClick={() => navigate("/")}
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
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderLeft: isMediumScreen ? "none" : "1px solid #ccc",
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
                <InputEmail 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  readOnly={isGoogleLogin} // Só torna o e-mail imutável se for login com Google
                />
                <InputCPF value={cpf} onChange={(e) => setCpf(e.target.value)} />
                <InputName value={name} onChange={(e) => setName(e.target.value)} />
                <InputPhone value={phone} onChange={(e) => setPhone(e.target.value)} />
                <InputPassword value={password} onChange={(e) => setPassword(e.target.value)} />
              </Box>

              <Stack sx={{ width: '100%', height: 20 }} spacing={2}>
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
                    backgroundColor: "#D72C7A",
                    color: "#FFF",
                    transform: "scale(1.05)"
                  },
                }}
                onClick={handleRegister}
              >
                Cadastrar
              </Button>
            </Grid>
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

export default Register;
