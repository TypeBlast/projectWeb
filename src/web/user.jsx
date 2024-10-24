import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import BoxPersonalData from "../components/layout/boxPersonalData";
import BoxAddress from "../components/layout/boxAddressData";
import BoxAppointment from "../components/layout/boxAppointmentData";

function User() {
  const initialUserState = { name: "", profilePicture: null };
  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Usuário recuperado do localStorage:", parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Erro ao fazer parse dos dados do usuário", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAdminRedirect = () => {
    navigate("/admin");
  };

  return (
    <div>
      {user.name ? (
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
                width: "12%",
                height: "12%",
                minWidth: "100px",
                minHeight: "100px",
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid #ddd",
                marginLeft: "11%",
                
              }}
            >
              <img
                src={
                  user.photoURL ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
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
              {user.name}
            </Typography>

            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: "9%",
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

          {/* Botão para Admin */}
          {user.role === "admin" && (
            <Box sx={{ marginTop: "20px", marginLeft: "140px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAdminRedirect}
                sx={{
                  width: "400px",
                  backgroundColor: "#EB389A",
                  marginTop: "20px",
                  fontFamily: "Poppins-Bold",
                  color: "#FFF",
                  textTransform: "capitalize",
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "#D5006D", // Cor ao passar o mouse
                  },
                }}
              >
                Acessar painel de administração
              </Button>
            </Box>
          )}
          <BoxPersonalData user={user} updateUser={setUser} />
          <BoxAddress user={user} />
          <BoxAppointment user={user} />
          <Box sx={{ paddingBottom: "30px" }} />
        </div>
      ) : (
        <Typography variant="h6">Nenhum usuário logado</Typography>
      )}
    </div>
  );
}

export default User;
