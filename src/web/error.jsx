import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ImageHome from "../assets/images/imageHome.png";

import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path); // Chama o hook de navegação
  };
  return (
    <div className="container">
      <img
        src={ImageHome}
        style={{
          width: 350,
          height: 300,
          marginTop: 85,
        }}
        alt="Error"
      />
      <Typography className="textError">
        Cadastre-se ou faça login para acessar nossos serviços exclusivos e
        cuidar do seu pet com facilidade!
      </Typography>
      <div>
        <Button
          className="buttonError"
          onClick={() => handleNavigation("/login")}
        >
          Entrar
        </Button>
        <Button
          className="buttonError"
          onClick={() => handleNavigation("/register")}
        >
          Cadastrar
        </Button>
      </div>
    </div>
  );
}

export default Error;
