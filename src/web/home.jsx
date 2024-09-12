import React from "react";

import { Typography, Button, Box } from "@mui/material";

import SearchBar from "../components/layout/searchBar";
import BoxWelcome from "../components/layout/boxWelcome";

function Home() {
  return (
    <div className="container">
      <Box sx={{marginTop: "50px"}}>
        <SearchBar />
        <BoxWelcome />
        {/* */}
      </Box>
    </div>
  );
}

export default Home;
