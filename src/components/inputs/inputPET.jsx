import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const InputPet = ({ pets, selectedPet, onPetChange }) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="pet-select-label">Selecione um Pet</InputLabel>
      <Select
        labelId="pet-select-label"
        id="pet-select"
        value={selectedPet}
        onChange={onPetChange}
        label="Selecione um Pet"
      >
        {pets.data && pets.data.length > 0 ? (
          pets.data.map((pet) => (
            <MenuItem key={pet.id} value={pet.id}>
              {pet.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            Nenhum pet disponível
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default InputPet;
