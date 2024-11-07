import React from "react";
import { Typography, Button, Box, useMediaQuery } from "@mui/material";

import SearchBar from "../components/layout/searchBar";
import BoxWelcome from "../components/layout/boxWelcome";
import Categories from "../components/layout/categoriesList";
import Species from "../components/layout/speciesList";
import ServicesList from "../components/layout/servicesList";

function Home() {
  const isMediumScreen = useMediaQuery("(max-width: 960px)");
  const isSmallScreen = useMediaQuery("(max-width: 959px)");
  return (
    <div className="container">
      {isSmallScreen && (
        <Box sx={{ marginTop: "0px", paddingBottom: "0px" }}>
          <SearchBar />
          <BoxWelcome />
        </Box>
      )}
      {!isMediumScreen && (
        <Box sx={{ marginTop: "50px", paddingBottom: "50px" }}>
          <SearchBar />
          <BoxWelcome />
          <>
            <Categories />
            <Species />
            <ServicesList />
          </>
        </Box>
      )}
    </div>
  );
}

export default Home;
