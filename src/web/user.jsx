import React, { useEffect, useState } from "react";

//imports components Mui Material
import { Typography, Box, Grid, Button } from "@mui/material";

//imports fontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAt, faIdCard, faPhone, faPen } from "@fortawesome/free-solid-svg-icons";

function User() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Recupera os dados do usuário do localStorage
    const storedUser = localStorage.getItem("user");

    // Verifica se o valor existe e se não é "undefined" ou "null"
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erro ao fazer parse dos dados do usuário", error);
      }
    }
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginTop: "50px",
              justifyContent: "start",
            }}
          >
            {/* Componente circular com imagem do usuário */}
            <Box
              sx={{
                width: "150px",
                height: "150px",
                borderRadius: "50%", // Deixa o box circular
                overflow: "hidden", // Garante que a imagem não ultrapasse o círculo
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid #ddd", // Opcional: adiciona uma borda ao redor
                marginLeft: "75px",
              }}
            >
              <img
                src="" // Aqui você pode colocar o link da imagem do usuário
                style={{ width: "100%", height: "100%", objectFit: "cover" }} // Ajusta a imagem para preencher o círculo
              />
            </Box>
            <Typography
              sx={{
                marginLeft: "10px",
                marginTop: "115px",
                fontFamily: "Poppins-Bold",
                fontSize: "1.5rem",
              }}
            >
              {user.name}
            </Typography>
          </Box>
          <Box>
            <Grid container spacing={2} sx={{ marginTop: "50px" }}>
              <Box
                sx={{
                  border: "1px solid #BFBFBF",
                  borderRadius: "10px",
                  width: "80%",
                  margin: "auto",
                  padding: "20px",
                  boxShadow: "0px 4px 4px rgba(191, 191, 191, 0.75)",
                }}
              >
                <Grid container>
                  <Grid item xs={8}>
                    <Typography
                      sx={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "Poppins-Regular" }}
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ color: "#D9D9D9" }} // Cor do ícone
                      />
                      {user.name}
                    </Typography>
                    <Typography
                      sx={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "Poppins-Regular", marginTop: "5px" }}
                    >
                      <FontAwesomeIcon
                        icon={faAt}
                        style={{ color: "#D9D9D9" }} // Cor do ícone
                      />
                      {user.email}
                    </Typography>
                    <Typography
                      sx={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "Poppins-Regular", marginTop: "5px" }}
                    >
                      <FontAwesomeIcon
                        icon={faIdCard}
                        style={{ color: "#D9D9D9" }} // Cor do ícone
                      />
                      {user.cpf}
                    </Typography>
                    <Typography
                      sx={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "Poppins-Regular", marginTop: "5px" }}
                    >
                      <FontAwesomeIcon
                        icon={faPhone}
                        style={{ color: "#D9D9D9" }} // Cor do ícone
                      />
                      {user.phone}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <Button>
                      <FontAwesomeIcon
                        icon={faPen}
                        style={{fontSize: "2rem", color: "#D9D9D9"}}
                      />
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Box>
        </div>
      ) : (
        <Typography variant="h6">Nenhum usuário logado</Typography>
      )}
    </div>
  );
}

export default User;
