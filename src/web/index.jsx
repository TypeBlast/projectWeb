import React from "react";
import Header from "../components/index/header";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";
import ImageHome from "../assets/images/ImageHome.png";

const Index = () => {
  // Hook para verificar o tamanho da tela
  const isMediumScreen = useMediaQuery("(max-width: 900px)");

  return (
    <div>
      <Header />
      <Grid container spacing={2} style={{ padding: "16px" }}>
        <Grid item xs={12} md={6}>
          <div className="gridLeft">
            <Typography className="title">
              Tudo o que Seu Pet Precisa em um Só Lugar!
            </Typography>
            <Typography className="textWelcome">
              Produtos, Serviços e Consultas para Cuidar e Mimá-lo com Qualidade
              e Amor
            </Typography>
            <Button className="buttonComecar">Começar</Button>
          </div>
        </Grid>
        {!isMediumScreen && (
          <Grid item xs={12} md={6}>
            <div className='gridRight'>
              <img
                src={ImageHome}
                style={{
                  borderRadius: 30,
                  width: 425,
                  height: 400,
                  marginTop: 20
                }}
              />
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Index;
