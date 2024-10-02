import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

// Importa as imagens SVG
import products from "./assets/products.svg";
import sales from "./assets/pc.svg";
import users from "./assets/anothers.svg";
import employees from "./assets/employer.svg";

const Cards = () => {
  const cards = [
    { title: "Produtos", image: products },
    { title: "Vendas", image: sales },
    { title: "Usuários", image: users },
    { title: "Funcionários", image: employees },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={3} justifyContent="center">
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card sx={{ display: "flex", alignItems: "center", padding: 2 }}>
              <img
                src={card.image}
                alt={card.title}
                style={{ width: "120px", height: "auto", marginRight: "20px" }} // Aumentando o tamanho da imagem
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "bold" }} // Aplicando Poppins Bold
                >
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Cards;
