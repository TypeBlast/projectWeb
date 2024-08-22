import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

//import style
import "./css/style.css";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        borderBottom: "none",
        boxShadow: "none",
        backgroundColor: "#FFF",
      }}
    >
      <Toolbar>
        <Typography component="div" className="petExpress">
          PetExpress
        </Typography>
        <div className="groupButton">
          <Button className="button">Produtos</Button>
          <Button className="button">Serviços</Button>
          <Button className="button">Consultas</Button>
        <Button className="buttonEntrar">Entrar</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
