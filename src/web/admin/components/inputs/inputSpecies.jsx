import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const InputSpecies = ({ species, selectedSpecies, handleSpeciesChange }) => {
  return (
    <FormControl
      variant="standard"
      fullWidth
      margin="normal"
      sx={{
        maxWidth: "500px",
        width: "90%",
        margin: "0 auto",
      }}
    >
      <InputLabel
        id="species-select-label"
        sx={{ color: "#D9D9D9", fontFamily: "Poppins-Regular" }}
      >
        Espécie
      </InputLabel>
      <Select
        labelId="species-select-label"
        id="species-select"
        value={selectedSpecies}
        onChange={handleSpeciesChange}
        sx={{
          '& .MuiInputBase-input': {
            color: '#333',
          },
          '& .Mui-focused .MuiInputLabel-root': {
            color: '#A8A8A8',
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: '#D9D9D9',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#A8A8A8',
          },
        }}
        IconComponent={() => (
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{
              marginRight: "20px",
              fontSize: "1.2rem",
              color: "#BFBFBF",
            }}
          />
        )}
        label="Selecione uma Espécie"
      >
        {species && species.length > 0 ? (
          species.map((specie) => (
            <MenuItem key={specie.id} value={specie.id}>
              {specie.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            Nenhuma espécie disponível
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default InputSpecies;
