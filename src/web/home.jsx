import React from "react";
import { Box, useMediaQuery } from "@mui/material";

import BoxWelcome from "../components/layout/boxWelcome";
import Categories from "../components/layout/categoriesList";
import Species from "../components/layout/speciesList";
import ServicesList from "../components/layout/servicesList";

function Home() {
  // Verifica se a tela é de tamanho médio ou pequeno (menos de 960px)
  const isMediumScreen = useMediaQuery("(max-width: 960px)");

  return (
    <div className="container">
      <Box className="content-box" sx={{ paddingBottom: "50px", marginTop: "50px" }}>
        <BoxWelcome />
        <Categories />
        <Species />
        {/* Condicionalmente renderiza o ServicesList apenas em telas maiores que 960px */}
        {!isMediumScreen && <ServicesList />}
      </Box>
    </div>
  );
}

export default Home;
