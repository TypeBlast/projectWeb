import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ImageHome from "../assets/images/imageHome.png";
import { useMediaQuery } from "@mui/material"; // Importar o hook
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const isMediumOrSmallerScreen = useMediaQuery("(max-width: 960px)"); // Verifica se a tela é 'md' ou menor

  const handleNavigation = (path) => {
    navigate(path); // Chama o hook de navegação
  };

  return (
    <div className="container">
      {!isMediumOrSmallerScreen && ( // Renderiza a imagem apenas se a tela for maior que 'md'
        <img
          src={ImageHome}
          style={{
            width: 350,
            height: 300,
            marginTop: 85,
          }}
          alt="Error"
        />
      )}
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
