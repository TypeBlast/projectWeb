import React from "react";
import { Typography, Button, Box, useMediaQuery } from "@mui/material"; // Importa useMediaQuery

import SearchBar from "../components/layout/searchBar";
import BoxWelcome from "../components/layout/boxWelcome";
import Categories from "../components/layout/categoriesList";
import Species from "../components/layout/speciesList";
import ServicesList from "../components/layout/servicesList";

function Home() {
  const isMediumScreen = useMediaQuery("(max-width: 960px)"); // Verifica se a tela é de tamanho médio ou menor

  return (
    <div className="container">
      <Box sx={{ marginTop: "50px", paddingBottom: "50px" }}>
        <SearchBar />
        <BoxWelcome />
        {/* Renderiza os componentes apenas se não estiver em tamanho médio */}
        {!isMediumScreen && (
          <>
            <Categories />
            <Species />
            <ServicesList />
          </>
        )}
      </Box>
    </div>
  );
}

export default Home;
