import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import BoxPersonalData from "../components/layout/boxPersonalData";

function User() {
  const initialUserState = { name: '', profilePicture: '' }; // Defina o estado inicial do usuário corretamente
  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
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

  return (
    <div>
      {user.name ? ( // Verifique se user.name existe
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
              <img
                src=""
                alt=""
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

          <BoxPersonalData user={user} updateUser={setUser} />
        </div>
      ) : (
        <Typography variant="h6">Nenhum usuário logado</Typography>
      )}
    </div>
  );
}

export default User;
