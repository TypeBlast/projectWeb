import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import BoxPersonalData from "../components/layout/boxPersonalData";
import BoxAddress from "../components/layout/boxAddressData";
import BoxAppointment from "../components/layout/boxAppointmentData";

function User() {
  // Estado inicial do usuário
  const initialUserState = { name: "", profilePicture: null }; // Modifique para profilePicture
  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar o usuário do localStorage
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Usuário recuperado do localStorage:", parsedUser); // Verificar o que está sendo recuperado

        // Atualizar o estado com os dados do usuário
        setUser(parsedUser);
      } catch (error) {
        console.error("Erro ao fazer parse dos dados do usuário", error);
      }
    }
  }, []);

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      {user.name ? (  // Verificar se o nome do usuário está presente
        <div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginTop: "50px",
              justifyContent: "start",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid #ddd",
                marginLeft: "75px",
              }}
            >
              {/* Verificar se a foto do perfil está disponível */}
              <img
  src={user.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} 
  alt={user.name}
  style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
              {user.name}  {/* Exibir o nome do usuário */}
            </Typography>

            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: "125px",
              }}
            >
              <Button onClick={handleLogout}>
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  style={{ color: "#EB1A0E", fontSize: "2rem" }}
                />
              </Button>
            </Box>
          </Box>

          {/* Componentes adicionais que utilizam os dados do usuário */}
          <BoxPersonalData user={user} updateUser={setUser} />
          <BoxAddress user={user} />
          <BoxAppointment user={user} />
        </div>
      ) : (
        <Typography variant="h6">Nenhum usuário logado</Typography>
      )}
    </div>
  );
}

export default User;
