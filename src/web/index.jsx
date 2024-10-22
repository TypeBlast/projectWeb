import React from "react";

//import components mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

//import images
import ImageHome from "../assets/images/imageHome.png";
import ImageProducts from "../assets/images/imageProducts.png"
import ImageServices from "../assets/images/imageServices.png"
import ImageConsults from "../assets/images/imageConsults.png"



function Index() {
  // Hook para verificar o tamanho da tela
  const isMediumScreen = useMediaQuery("(max-width: 950px)");

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path); // Chama o hook de navegação
  };
  return (
    <div style={{paddingBottom: 50}}>
      <Grid container>
        <Grid item xs={12} md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: 'column'
        }}>
          <Typography className="titleWelcome">Tudo o que Seu Pet Precisa em um Só Lugar!</Typography>
          <Typography className="textWelcome">Produtos, Serviços e Consultas para Cuidar e Mimá-lo com Qualidade e Amor</Typography>
          <Button className="buttonComecar" onClick={() => handleNavigation("/login")}>Começar</Button>
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
                marginTop: '10%'
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
                marginTop: '5%',
              }}
              alt="Produtos"
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
        <Grid item xs={12} md={6}
         sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: 'column'
        }}>
        <Typography className="titleOnboarding">Servicos</Typography>
        <Typography className="textOnboarding">Transforme o visual do seu pet com nossos serviços de banho e tosa, garantindo cuidado e carinho em cada detalhe.</Typography>
        </Grid>
        {!isMediumScreen && (
        <Grid item md={6} 
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: 'center' 
          }}>
            <img
              src={ImageServices}
              style={{
                width: 380,
                height: 350,
                marginTop: '5%',
              }}
              alt="Serviços"
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
              src={ImageConsults}
              style={{
                width: 390,
                height: 380 ,
                marginTop: '5%',
              }}
              alt="Consults"
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
        <Typography className="titleOnboarding">Consultas</Typography>
        <Typography className="textOnboarding">Cuide da saúde do seu pet com nossas consultas veterinárias, oferecendo atenção especializada e bem-estar em cada visita.</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Index;