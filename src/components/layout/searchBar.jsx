import React, { useState } from "react";
import { TextField, Box, InputAdornment, IconButton, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CloseIcon from "@mui/icons-material/Close";

function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const handleClear = () => {
    setValue(""); // Limpa o campo de busca
    onSearch(""); // Chama a pesquisa com o campo vazio para exibir todos os produtos
  };

  const handleSearch = () => {
    onSearch(value); // Chama a função de pesquisa com o valor atual do input
  };
  
  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <TextField
        id="outlined-search"
        label="O que seu pet precisa?"
        value={value}
        onChange={(e) => setValue(e.target.value)} // Atualiza o valor do campo
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon
                icon={faSearch}
                style={{ fontSize: "20px", color: "#BFBFBF" }}
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {value && (
                <IconButton onClick={handleClear} size="small">
                  <CloseIcon style={{ color: "#BFBFBF" }} />
                </IconButton>
              )}
            </InputAdornment>
          ),
          style: { paddingLeft: "30px" },
        }}
        type="search"
        variant="outlined"
        sx={{ width: "80vw", maxWidth: "800px" }}
      />
      <Button
        variant="contained"
        onClick={handleSearch} // Chama a pesquisa ao clicar
        sx={{ marginLeft: "10px", backgroundColor: "#BFBFBF" }}
      >
        Pesquisar
      </Button>
    </Box>
  );
}

export default SearchBar;
