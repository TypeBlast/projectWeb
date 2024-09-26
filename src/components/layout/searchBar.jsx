import React, { useState } from "react";
import {
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
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
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%", alignItems: "center" }}>
      <TextField
        id="outlined-search"
        value={value}
        onChange={(e) => setValue(e.target.value)} // Atualiza o valor do campo
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ marginRight: 0 }}>
              {value === "" && (
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ fontSize: "20px", color: "#BFBFBF", marginLeft: "25px" }}
                />
              )}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {value && (
                <>
                  <IconButton onClick={handleClear} size="small">
                    <CloseIcon style={{ color: "#BFBFBF" }} />
                  </IconButton>
                  <Button
                    onClick={handleSearch}
                  >
                    <FontAwesomeIcon
                  icon={faSearch}
                  style={{ fontSize: "20px", color: "#BFBFBF", marginLeft: "25px" }}
                />
                  </Button>
                </>
              )}
            </InputAdornment>
          ),
          style: { paddingLeft: 0 },
        }}
        placeholder="O que seu pet precisa?" // Placeholder com lupa e texto
        type="text"
        variant="outlined"
        sx={{
          width: "70vw",
          maxWidth: "800px",
          borderRadius: "10px",
          "& .MuiInputBase-input": {
            fontFamily: "Poppins-Regular", // Fonte para o texto digitado
            fontSize: "1.2rem",
            color: "#333", // Cor do texto da pesquisa
            marginLeft: "25px"
          },
          "& .MuiInputLabel-root": {
            fontFamily: "Poppins-Regular", // Fonte para o placeholder
            fontSize: "16px",
            color: "#BFBFBF", // Cor do placeholder
            marginLeft: "25px"
          },
        }}
      />
    </Box>
  );
}

export default SearchBar;
