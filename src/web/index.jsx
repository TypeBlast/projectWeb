import React from "react";
import Header from "../components/index/header";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";
import ImageHome from "../assets/images/imageHome.png";
import ImageProducts from "../assets/images/imageProducts.png"

function Index() {
  // Hook para verificar o tamanho da tela
  const isMediumScreen = useMediaQuery("(max-width: 950px)");

  return (
    <div>
      <Header />
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography className="titleWelcome">Tudo o que Seu Pet Precisa em um Só Lugar!</Typography>
          <Typography className="textWelcome">Produtos, Serviços e Consultas para Cuidar e Mimá-lo com Qualidade e Amor</Typography>
          <Button className="buttonComecar">Começar</Button>
        </Grid>

        {!isMediumScreen && (
          <Grid
            item
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={ImageHome}
              style={{
                width: 450,
                height: 400,
                marginTop: 10,
              }}
              alt="Home"
            />
          </Grid>
        )}
      </Grid>
      <Grid container sx={{marginTop: 20}}>
        {!isMediumScreen && (
          <Grid item md={6} 
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <img
              src={ImageProducts}
              style={{
                width: 350,
                height: 300 ,
                marginTop: 10,
              }}
              alt="Home"
            />
          </Grid>
        )}
        <Grid item xs={12} md={6}
         sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: 'column'
        }}>
        <Typography className="titleOnboarding">Produtos</Typography>
        <Typography className="textOnboarding">Encontre tudo que seu pet precisa para ser feliz e saudável aqui no nosso app!</Typography>
        </Grid>
      </Grid>
      <Grid container sx={{marginTop: 20}}>
        {!isMediumScreen && ( 
        <Grid item xs={12} md={6}
         sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: 'column'
        }}>
        <Typography className="titleOnboarding">Produtos</Typography>
        <Typography className="textOnboarding">Encontre tudo que seu pet precisa para ser feliz e saudável aqui no nosso app!</Typography>
        </Grid>
        )}
        <Grid item md={6} 
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <img
              src={ImageProducts}
              style={{
                width: 350,
                height: 300 ,
                marginTop: 10,
              }}
              alt="Home"
            />
          </Grid>
      </Grid>
    </div>
  );
}

export default Index;
